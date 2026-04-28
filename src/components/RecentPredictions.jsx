import { useEffect,useState } from "react"

export default function RecentPredictions(){

const [data,setData] = useState([])

useEffect(()=>{

const history = JSON.parse(
localStorage.getItem("predictions") || "[]"
)

setData(history)

},[])

return(

<div className="mt-10">

<h2 className="text-xl mb-4">

Recent Predictions

</h2>

<div className="grid grid-cols-5 gap-4">

{data.map((item,i)=>(

<div
key={i}
className="bg-[#1e2a1e] p-4 rounded-lg"
>

{item.image && (

<img
src={`data:image/jpeg;base64,${item.image}`}
className="rounded"
/>

)}

<div className="mt-2">

<div>
{item.breed}
</div>

<div>
{item.weight}kg
</div>

</div>

</div>

))}

</div>

</div>

)

}