// api/get-token.js
export default async function handler(req, res) {
  const { code } = req.query; // 카페24가 던져주는 '인증 코드'

  // [수정] 대표님의 인증정보를 여기에 넣으세요
  const clientId = '7nyL... (아까 그 Client ID)'; 
  const clientSecret = '... (아까 그 Secret Key)';
  const mallId = 'myfootsize';
  const redirectUri = 'https://matchup-admin-swart.vercel.app/api/get-token';

  if (!code) {
    return res.status(400).send('인증 코드(code)가 없습니다.');
  }

  try {
    // 카페24에 '진짜 열쇠(Access Token)'를 달라고 요청하는 과정
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

    // 화면에 토큰 정보를 띄워줍니다.
    res.status(200).send(`
      <h1>성공! 아래 토큰을 복사하세요.</h1>
      <p><b>Access Token:</b> <br>${data.access_token}</p>
      <p>유효기간: 2시간</p>
    `);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
