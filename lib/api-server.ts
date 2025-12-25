

export async function apiServerGet(endpoint: string) {
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
        cache: "no-store",
    });
    if (!res.ok){
        console.error("Unauthorized access to:", endpoint,"with status code", res.status);
    }
    
    return res.json();
}