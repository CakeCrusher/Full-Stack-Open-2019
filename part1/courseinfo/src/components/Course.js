import React from 'react'

const Header = (props) => {
    return(
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>{props.part}: {props.exerciseNum} exercises</p>
        </div>
    )
}

const Content = ({data}) =>{
    const parts = () => (
        data.map((part) => <Part key={part.id} part={part.name} exerciseNum={part.exercises} />)
    )

    return(
        <div>
            {parts()}
        </div>
    )
}

const Total = ({parts}) => {
    const total = () => parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return(
        <div>
            <p>total of {total()} exercises.</p>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header course={course.name} />
            <Content data={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
 export default Course