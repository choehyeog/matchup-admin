// api/products.js
export default async function handler(req, res) {
  // [수정] 방금 발급받은 12자 토큰을 여기에 넣으세요!
  const accessToken = '55TVwKseIyUfWFsCrHZmGM'; 
  const mallId = 'myfootsize';

  try {
    // 진짜 카페24 상품 창고에 접속합니다.
    const response = await fetch(`https://${mallId}.cafe24api.com/api/v2/admin/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Cafe24-Api-Version': '2024-03'
      }
    });

    const data = await response.json();

    // 카페24에서 보내준 진짜 데이터를 우리 화면(index.html)으로 전달합니다.
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '카페24 상품 데이터를 가져오는데 실패했습니다.' });
  }
}
