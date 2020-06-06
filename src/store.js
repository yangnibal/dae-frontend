import { observable } from 'mobx'

export default class Store{
    @observable testinfo = {}
    @observable studentinfo = {}
    @observable gradeinfo = {}
    @observable checkedStudents = []
    @observable schoolyear = [
        { value: "초1", label: "초1" },
        { value: "초2", label: "초2" },
        { value: "초3", label: "초3" },
        { value: "초4", label: "초4" },
        { value: "초5", label: "초5" },
        { value: "초6", label: "초6" },
        { value: "중1", label: "중1" },
        { value: "중2", label: "중2" },
        { value: "중3", label: "중3" },
        { value: "고1", label: "고1" },
        { value: "고2", label: "고2" },
        { value: "고3", label: "고3" },
    ]
    @observable semester = [
        { value: "1학기 중간", label: "1학기 중간" },
        { value: "1학기 기말", label: "1학기 기말" },
        { value: "2학기 중간", label: "2학기 중간" },
        { value: "2학기 기말", label: "2학기 기말" },
        { value: "3월 모의고사", label: "3월 모의고사" },
        { value: "6월 모의고사", label: "6월 모의고사" },
        { value: "9월 모의고사", label: "9월 모의고사" },
        { value: "11월 모의고사", label: "11월 모의고사" },
    ]
    @observable subject = [
        { value: "수학", label: "수학" },
        { value: "영어", label: "영어" },
        { value: "국어", label: "국어" },
        { value: "과학", label: "과학" },
    ]
    @observable group = []
    @observable data = [
        {
            "점수 비교": "평균",
            "average": 72.6,
            "averageColor": "hsl(215,54%,73%)",
            "myscore": 0
        },
        {
            "점수 비교": "내점수",
            "average": 0,
            "myscore": 98,
            "myscoreColor": "hsl(263,22%,56%)"
        }
    ]
    @observable printProps = {}
    @observable infgroup = []
}
