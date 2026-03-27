// api/products.js (페이징 지원 버전)
export default async function handler(req, res) {
  // [필독] 어제 성공한 진짜 토큰을 여기에 꼭 다시 넣으세요!
  const accessToken = '55TVwKseIyUfWFsCrHZmGM'; 
  const mallId = 'myfootsize';
  const apiVersion = '2026-03';

  // 1. 브라우저에서 요청한 페이지 번호와 개수를 가져옵니다. (없으면 기본값 1페이지, 20개)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  // 2. 카페24 API 규격에 맞게 '건너뛸 개수(offset)'를 계산합니다.
  // 예: 1페이지 = 0개 건너뜀, 2페이지 = 20개 건너뜀
  const offset = (page - 1) * limit;

  try {
    // 3. 카페24 API 호출 (limit와 offset 파라미터 추가)
    const requestUrl = `https://${mallId}.cafe24api.com/api/v2/admin/products?limit=${limit}&offset=${offset}&fields=shop_no,product_no,product_name,price,tiny_image,list_image`;
    
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Cafe24-Api-Version': apiVersion
      }
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ message: "카페24 에러", details: data.error });
    }

    // 4. 상품 데이터와 함께 현재 페이징 정보를 브라우저로 돌려줍니다.
    res.status(200).json({
        products: data.products,
        pagination: {
            currentPage: page,
            itemsPerPage: limit,
            // 카페24 상품 API는 전체 개수를 한 번에 주지 않으므로, 
            // 현재 가져온 개수가 limit와 같으면 다음 페이지가 있다고 가정합니다.
            hasNextPage: data.products.length === limit 
        }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
