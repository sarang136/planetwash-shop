import { useEffect, useState } from "react"
import ChartCards from "../components/ChartCards"
import StatCards from "../components/StatCards"
import OrderTable from "../components/OrderTable"
import ShimmerUiForDashboard from "../../ShimmerUis/ShimmerUiForDashboard"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const location = useLocation();

  
 console.log("location",location?.state?.shop?._id);
 



  const shopId =  location?.state?.shop?._id   
  console.log("this is shodID",shopId);
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading ? (
        <ShimmerUiForDashboard />
      ) : (
        <div className="h-[85vh] overflow-y-scroll">
          <ChartCards />
          <StatCards />
          <OrderTable shopId = {shopId} />
        </div>
      )}
    </>
  )
}

export default Dashboard
