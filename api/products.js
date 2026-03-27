// api/products.js
export default async function handler(req, res) {
  // [필독] 현재 사용 중인 토큰을 여기에 꼭 넣으세요!
  const accessToken = 'tXCJZ7SrBVdpkktLtGZ1FB'; 
  const mallId = 'myfootsize';

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  try {
    // [수정] fields 항목에 'list_image'를 명시적으로 추가했습니다.
    const requestUrl = `https://${mallId}.cafe24api.com/api/v2/admin/products?limit=${limit}&offset=${offset}&fields=product_no,product_code,product_name,tiny_image,list_image,display,selling`;
    
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Cafe24-Api-Version': '2026-03'
      }
    });

    const data = await response.json();
    res.status(200).json({
        products: data.products,
        pagination: {
            currentPage: page,
            hasNextPage: data.products.length === limit 
        }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
