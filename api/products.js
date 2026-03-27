// api/products.js
export default async function handler(req, res) {
  // [중요] 아까 복사한 긴 토큰을 여기에 붙여넣으세요!
  const accessToken = '여기에_복사한_액세스_토큰을_넣으세요'; 
  const mallId = 'myfootsize';

  try {
    // 카페24 API 호출 (상품 목록 가져오기)
    const response = await fetch(`https://${mallId}.cafe24api.com/api/v2/admin/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Cafe24-Api-Version': '2024-03'
      }
    });

    const data = await response.json();

    // 브라우저로 데이터 전송
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '카페24 데이터를 가져오는 데 실패했습니다.' });
  }
}
