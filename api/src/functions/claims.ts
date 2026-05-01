import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { connectToDatabase } from "../utils/db";
import { Claim } from "../models/Claim";

// Fallback initial data to seed the database if it's empty
const initialClaimsData = [
  {
    id: 'claim-001',
    timestamp: '12 minutes ago',
    category: 'Politics',
    status: 'debunked',
    confidence: 97,
    headline: 'Viral Post Claims New Federal Policy Will Eliminate Medicare Benefits',
    description: 'Social media posts misrepresent healthcare legislation, claiming complete elimination of Medicare benefits. Official sources confirm no such provisions exist.',
    thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: { shares: '3.2M', reach: '8.7M', platforms: 4 },
    sources: ['Medicare.gov', 'Congressional Budget Office', 'FactCheck.org'],
    expert: 'Dr. Michael Torres, Healthcare Policy Expert'
  },
  {
    id: 'claim-002',
    timestamp: '28 minutes ago',
    category: 'Technology',
    status: 'debunked',
    confidence: 99,
    headline: 'False Report: Major Tech Company Experiencing Global Data Breach',
    description: 'Fabricated news article claims massive data breach affecting millions of users. Company confirms no breach occurred and reports originate from known disinformation network.',
    thumbnail: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHNlY3VyaXR5fGVufDF8fHx8MTc3NTE4NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: { shares: '2.8M', reach: '7.1M', platforms: 5 },
    sources: ['Company Official Statement', 'CyberSecurity & Infrastructure Security Agency', 'TechCrunch'],
    expert: 'Rachel Kim, Cybersecurity Analyst'
  }
];

export async function handleClaims(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        await connectToDatabase();

        if (request.method === 'GET') {
            let claims = await Claim.find().sort({ createdAt: -1 });

            // Automatically seed database if empty
            if (claims.length === 0) {
                context.log("Database empty. Seeding initial data...");
                await Claim.insertMany(initialClaimsData as any);
                claims = await Claim.find().sort({ createdAt: -1 });
            }

            return { jsonBody: claims };
        } 
        
        if (request.method === 'POST') {
            const body = await request.json();
            const newClaim = new Claim(body);
            await newClaim.save();
            return { status: 201, jsonBody: newClaim };
        }

        return { status: 405, jsonBody: { error: 'Method Not Allowed' } };

    } catch (error) {
        context.log("Database Error:", error);
        
        // If MONGODB_URI is not set or connection fails, fallback to hardcoded data for development
        if (request.method === 'GET') {
            context.log("Falling back to local data due to database error.");
            return { jsonBody: initialClaimsData };
        }
        
        return { status: 500, jsonBody: { error: 'Internal Server Error' } };
    }
};

app.http('claims', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: handleClaims
});
