
import ProductViewPage from "../page"


// interface Params {
//   params: Promise<stirng>

// }

// interface Id {

// }

export default function GrapParam ({params}: any) {
 
  return (
    <ProductViewPage id={params.id}/>
  )

}