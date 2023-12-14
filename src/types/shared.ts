import React,{Dispatch, SetStateAction} from "react"

type Children = {
    children:React.ReactNode
}
type SetState<T>= Dispatch<SetStateAction<T>>

type CourseType = {
    title:string;
    teacher:string;
    price:number;
    numberOfStudents:number;
    imgSrc:string;
    path:string;
}

export type {Children,SetState,CourseType}