export async function POST(request: Request) {
    // For example, fetch data from your DB here
    return new Response(JSON.stringify({"DisplayName": "badspeeling"}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}