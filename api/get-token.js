// api/get-token.js (상세 진단용 버전)
export default async function handler(req, res) {
  const allParams = req.query; // 카페24가 보낸 모든 신호를 다 받습니다.

  // 만약 카페24가 보낸 'code'가 있다면 진행
  if (allParams.code) {
    const clientId = '7myLe1AtRy3UfivGoNqetD'; 
    const clientSecret = 'L3ewEj5ic69WDTMmLyp3xF'; // 보류 중인 Secret Key 입력
    const mallId = 'myfootsize';
    const redirectUri = 'https://matchup-admin-swart.vercel.app/api/get-token';

    try {
      const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const response = await fetch(`https://${mallId}.cafe24api.com/api/v2/oauth/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'code': allParams.code,
          'redirect_uri': redirectUri
        })
      });

      const data = await response.json();
      return res.status(200).send(`
        <div style="padding:20px; font-family:sans-serif;">
          <h1 style="color:blue;">🎉 토큰 발급 성공!</h1>
          <p>아래 <b>Access Token</b>을 복사해서 products.js에 넣으세요:</p>
          <textarea style="width:100%; height:100px; word-break:break-all;">${data.access_token}</textarea>
        </div>
      `);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 코드가 없을 경우, 현재 받은 모든 정보를 화면에 뿌려줍니다 (디버깅용)
  res.status(200).send(`
    <div style="padding:20px; border:2px solid red;">
      <h2 style="color:red;">⚠️ 인증 코드를 받지 못했습니다.</h2>
      <p><b>현재 서버가 받은 파라미터들:</b></p>
      <pre style="background:#eee; padding:10px;">${JSON.stringify(allParams, null, 2)}</pre>
      <hr>
      <p>이 화면이 보인다면 <b>카페24 인증 링크</b>를 다시 클릭해 보세요.</p>
    </div>
  `);
}
