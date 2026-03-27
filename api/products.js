// api/products.js
export default async function handler(req, res) {
  // 1. 방금 확인한 진짜 토큰을 여기에 넣으세요!
  const accessToken = '55TVwKseIyUfWFsCrHZmGM'; 
  const mallId = 'myfootsize';

  try {
    const response = await fetch(`https://${mallId}.cafe24api.com/api/v2/admin/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        // 2. 2024-03 대신 현재 지원되는 최신 버전인 2026-03을 넣습니다.
        'X-Cafe24-Api-Version': '2026-03' 
      }
    });

    const data = await response.json();
    
    // 카페24 응답 데이터를 브라우저로 보냅니다.
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '데이터 호출 중 서버 오류 발생: ' + error.message });
  }
}
