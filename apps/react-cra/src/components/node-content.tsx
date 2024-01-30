export const NodeContent = ({ node }: any) => {

  return <div className="card w-96 bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">
        Shoes! {node?.id}
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
        <button className='btn btn-primary' onClick={() => console.log('pres mess, ', node?.id)}>Press me</button>
      </div>
    </div>
  </div>
}
