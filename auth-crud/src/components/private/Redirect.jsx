import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Redirect = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    }, [count, navigate])
  return (
      <div style={{textAlign: 'center', marginTop: "120px"}} >
          <h5>Redirecting you in <span style={{color: '#007bff'}}>{"0" + count}</span> seconds</h5>
    </div>
  )
}

export default Redirect