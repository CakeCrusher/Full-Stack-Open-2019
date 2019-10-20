import React, {useState} from "react"
import ReactDOM from "react-dom"

const Statistic = ({text, value}) => (
    <tr>
        <td>{text[0]}</td>
        <td>{value}{text[1]}</td>
    </tr>
)

const Statistics = (props) => {
    if ((props.good + props.neutral + props.bad) === 0){
        return (
            <div>
                No feedback given
            </div>
        )
    }
    else {
        return(
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text={["good", ""]} value={props.good} />
                        <Statistic text={["neutral", ""]} value={props.neutral} />
                        <Statistic text={["bad", ""]} value={props.bad} />
                        <Statistic text={["all", ""]} value={props.good + props.neutral + props.bad} />
                        <Statistic text={["Avrage", ""]} value={props.avg} />
                        <Statistic text={["Positive", "%"]} value={props.positive * 100} />
                        </tbody>
                </table>
            </div>
        )
    }
    
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [avg, setAvg] = useState(0)
    const [positive, setPositive] = useState(0)

    const makeAvg = (target) => {
        if (target ==="good") {
            return (good - bad + 1) / (good + neutral + bad + 1) 
        }
        else if (target ==="bad") {
            return (good - bad - 1) / (good + neutral + bad + 1) 
        }
        else{
            return (good - bad) / (good + neutral + bad + 1) 
        }
    }

    const makePositive = (target) => {
        if (target ==="good") {
            return (good + 1) / (good + neutral + bad + 1) 
        }
        else if (target ==="bad") {
            return good / (good + neutral + bad + 1) 
        }
        else{
            return good / (good + neutral + bad + 1) 
        }
    }
    
    const handleClick = (target) => () =>{
        if (target === "good"){
            setGood(good + 1)
            setAvg(makeAvg("good"))
            setPositive(makePositive("good"))
        }
        else if (target === "bad"){
            setBad(bad + 1)
            setAvg(makeAvg("bad"))
            setPositive(makePositive("bad"))
        }
        else if (target === "neutral"){
            setNeutral(neutral + 1)
            setAvg(makeAvg("neutral"))
            setPositive(makePositive("neutral"))
        }
        
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={handleClick("good")} text="good" />
            <Button handleClick={handleClick("neutral")} text="neutral" />
            <Button handleClick={handleClick("bad")} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} avg={avg} positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))