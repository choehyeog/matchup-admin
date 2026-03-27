// api/get-token.js (주소 수정 버전)
export default async function handler(req, res) {
  const { code } = req.query;

  if (code) {
    const clientId = '7myLe1AtRy3UfivGoNqetD'; 
    const clientSecret = '여기에_진짜_Secret_Key를_넣으세요'; // <-- 꼭 확인!
    const mallId = 'myfootsize';
    // [수정] 아래 주소에서 admin/ 을 제거했습니다.
    const tokenUrl = `https://${mallId}.cafe24api.com/api/v2/oauth/token`;
    const redirectUri = 'https://matchup-admin-swart.vercel.app/api/get-token';

    try {
      const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      
      const response = await fetch(tokenUrl, {
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

      return res.status(200).send(`
        <div style="padding:20px; font-family:sans-serif; background:#f0f7ff; border:2px solid #0070f3;">
          <h1 style="color:#0070f3;">🎉 드디어 토큰 발급 성공!</h1>
          <p>아래 <b>access_token</b> 옆의 긴 글자를 복사하세요:</p>
          <pre style="background:#fff; padding:15px; border:1px solid #ccc; white-space:pre-wrap; word-break:break-all;">${JSON.stringify(data, null, 2)}</pre>
          <p style="color:red;">※ 만약 "error"가 보인다면 Secret Key 오타일 확률이 높습니다.</p>
        </div>
      `);
    } catch (error) {
      return res.status(500).send("서버 오류: " + error.message);
    }
  }
  res.status(200).send("코드가 없습니다. 카페24 링크를 다시 클릭하세요.");
}
