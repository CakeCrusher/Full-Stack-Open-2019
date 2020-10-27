export interface ContentObject {
    name: string;
    exerciseCount: number;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundimentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartWithDescription {
    name: "Im special";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

