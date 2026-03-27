// api/get-token.js (전체 응답 확인용)
export default async function handler(req, res) {
  const { code } = req.query;

  if (code) {
    const clientId = '7myLe1AtRy3UfivGoNqetD'; 
    const clientSecret = 'L3ewEj5ic69WDTMmLyp3xF'; // <-- 이 부분을 다시 확인!
    const mallId = 'myfootsize';
    const redirectUri = 'https://matchup-admin-swart.vercel.app/api/get-token';

    try {
      const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const response = await fetch(`https://${mallId}.cafe24api.com/api/v2/admin/oauth/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': redirectUri
        })
      });

      const data = await response.json();

      // [핵심] 카페24가 보내준 모든 데이터를 그냥 다 보여줍니다.
      return res.status(200).send(`
        <div style="padding:20px; font-family:sans-serif;">
          <h2>카페24 응답 결과</h2>
          <pre style="background:#eee; padding:15px; overflow-x:auto;">${JSON.stringify(data, null, 2)}</pre>
          <hr>
          <p>만약 위에 <b>access_token</b>이 보인다면 성공입니다!</p>
        </div>
      `);
    } catch (error) {
      return res.status(500).send("서버 오류: " + error.message);
    }
  }
  res.status(200).send("코드가 없습니다. 카페24 링크를 다시 클릭하세요.");
}
