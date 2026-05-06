import psycopg2

import psycopg2

def get_conn():
    return psycopg2.connect(
        host="verifyai-postgres-server.postgres.database.azure.com",
        database="verifyaidb",   # ⚠️ use correct DB
        user="dbadmin",          # ⚠️ IMPORTANT: use THIS (not with @server)
        password="Verifyai!",    # your new password
        port=5432,
        sslmode="require"
    )