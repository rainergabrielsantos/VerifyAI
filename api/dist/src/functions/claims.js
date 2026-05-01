"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaims = void 0;
const functions_1 = require("@azure/functions");
const liveClaimsData = [
    {
        id: 'claim-001',
        timestamp: '12 minutes ago',
        category: 'Politics',
        status: 'debunked',
        confidence: 97,
        headline: 'Viral Post Claims New Federal Policy Will Eliminate Medicare Benefits',
        description: 'Social media posts misrepresent healthcare legislation, claiming complete elimination of Medicare benefits. Official sources confirm no such provisions exist.',
        thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        viralMetrics: {
            shares: '3.2M',
            reach: '8.7M',
            platforms: 4
        },
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
        viralMetrics: {
            shares: '2.8M',
            reach: '7.1M',
            platforms: 5
        },
        sources: ['Company Official Statement', 'CyberSecurity & Infrastructure Security Agency', 'TechCrunch'],
        expert: 'Rachel Kim, Cybersecurity Analyst'
    },
    {
        id: 'claim-003',
        timestamp: '42 minutes ago',
        category: 'Politics',
        status: 'suspicious',
        confidence: 85,
        headline: 'Misleading Statistics About Immigration Policy Circulate on X',
        description: 'Posts share immigration statistics without proper context, creating false impressions. Numbers are technically accurate but deliberately presented to mislead.',
        thumbnail: 'https://images.unsplash.com/photo-1773841915558-25083446c52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjBkZWJhdGUlMjBzdGFnZXxlbnwxfHx8fDE3NzUxODU2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        viralMetrics: {
            shares: '1.9M',
            reach: '5.3M',
            platforms: 3
        },
        sources: ['Department of Homeland Security', 'Pew Research Center', 'Reuters'],
        expert: 'Prof. James Anderson, Immigration Studies'
    },
    {
        id: 'claim-004',
        timestamp: '1 hour ago',
        category: 'Technology',
        status: 'verified',
        confidence: 94,
        headline: 'Authentic Video Shows New AI Model Capabilities from Research Lab',
        description: 'Viral demonstration video is confirmed authentic. Research institution validates the AI advancement showcase, with peer-reviewed documentation available.',
        thumbnail: 'https://images.unsplash.com/photo-1675557570482-df9926f61d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwxfHx8fDE3NzUwOTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        viralMetrics: {
            shares: '2.1M',
            reach: '6.2M',
            platforms: 4
        },
        sources: ['MIT Technology Review', 'Nature Journal', 'Lab Official Website'],
        expert: 'Dr. Lisa Zhang, AI Research Scientist'
    }
];
function getClaims(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Fetching claims API`);
        return { jsonBody: liveClaimsData };
    });
}
exports.getClaims = getClaims;
;
functions_1.app.http('claims', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getClaims
});
//# sourceMappingURL=claims.js.map