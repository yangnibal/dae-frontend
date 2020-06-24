import { observable, action } from 'mobx'
import axios from 'axios'

export default class Store{

    @action Post = (url, name, data, doSomething) => {
        var formData = new FormData()
        for(var i=0; i<name.length; i++){
            formData.append(name[i], data[i])
        }
        axios.post(url, formData, {
            headers: {
                Authorization: "Token " + this.getToken()
            }
        })
        .then(res => {
            doSomething(res)
        })
    }
    @action getToken(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        return token
    }
    @action caniuse = (type, doSomething) => {
        axios.post("https://api.daeoebi.com/users/caniuse/", ({
            type: type
        }), {
            headers: {
                Authorization: "Token " + this.getToken()
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                doSomething()
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }


    @observable tests = []
    @action getMyTest = () => {
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/tests/getmytest/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.tests = res.data
            })
            .catch(err => {
            })
        }
        this.caniuse(2, doSomething)
    }
    @action findTest = (grade, semester, subject) => {
        const doSomething = () => {
            axios.post("https://api.daeoebi.com/tests/findtest/", ({
                grade: grade,
                test_type: semester,
                subject: subject
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.tests = res.data
            })
            .catch(err => {
            })
        }
        this.caniuse(2, doSomething)
    }
    @action testRemove = (id) => {
        const doSomething = () => {
            axios.delete("https://api.daeoebi.com/tests/" + id + "/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                
            })
        }
        this.caniuse(2, doSomething)
    }
    @action getGroup = () => {
        const doSomething = () => {
            const group = []
            axios.get("https://api.daeoebi.com/groups/getmygroup/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                for(var i in res.data){
                    group.push({value: res.data[i]['name'], label: res.data[i]['name']})
                }
                this.group = group
            })
            .catch(err => {
                
            })
        }
        this.caniuse(2, doSomething)
    }
    @observable students = []
    @action getStd = (test_id) => {
        const doSomething = () => {
            if(test_id===null) test_id = ""
            this.getGroup()
            axios.post("https://api.daeoebi.com/students/getmystd/", ({
                test: test_id
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                for(var i in res.data){
                    res.data[i].isChecked=false
                }
                this.students = res.data
            })
            .catch(err => {
                
            })
        }
        this.caniuse(2, doSomething)
    }
    @action findstd = (grade, group, name) => {
        const doSomething = () => {
            axios.post("https://api.daeoebi.com/students/findstd/", ({
                grade: grade,
                group: group,
                name: name
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                for(var i in res.data){
                    res.data[i].isChecked=false
                }
                this.students = res.data
            })
            .catch(err => {
                
            })
        }
        this.caniuse(2, doSomething)
    }
    @action studentRemove = (id) => {
        const doSomething = () => {
            axios.delete("https://api.daeoebi.com/students/" + id + "/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                
            })
        }
        this.caniuse(2, doSomething)
    }

    @observable vids = []
    @action findVid = (subject, grade, group) => {
        const doSomething = () => {
            axios.post("https://api.daeoebi.com/videos/findvid/", ({
                grade: grade,
                subject: subject,
                group: group
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.vids = res.data
            })
            .catch(err => {
                
            })
        }
        this.caniuse(1, doSomething)
    }
    @action getInfGroup = () => {
        const group = []
        axios.get("https://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + this.getToken()
            }
        })
        .then(res => {
            var data = res.data['results']
            for(var i in data){
                group.push({value: data[i]['name'], label: data[i]['name']})
            }
            this.infgroup = group
        })
        .catch(err => {
            
        })
    }
    @action getVids = () => {
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/videos", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.vids = res.data['results']
                this.getInfGroup()
            })
            .catch(err => {
            })
        }
        this.caniuse(1, doSomething)
    }
    @observable iframe = ""
    @action getIframe = (path) => {
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/videos/" + path + "/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.iframe = res.data['iframe']
            })
            .catch(err => {
                
            })
        }
        this.caniuse(1, doSomething)  
    }
     

    @observable testinfo = {}
    @observable studentinfo = {}
    @observable gradeinfo = {}
    @observable checkedStudents = []
    @observable schoolyear = [
	{ value: "", label: "전체" },
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
        { value: "", label: "전체" },
	    { value: "1학기", label: "1학기" },
        { value: "2학기", label: "2학기" },
        { value: "3월 모의고사", label: "3월 모의고사" },
        { value: "6월 모의고사", label: "6월 모의고사" },
        { value: "9월 모의고사", label: "9월 모의고사" },
        { value: "11월 모의고사", label: "11월 모의고사" },
    ]
    @observable subject = [
	{ value: "", label: "전체" },
        { value: "수학", label: "수학" },
        { value: "영어", label: "영어" },
        { value: "국어", label: "국어" },
        { value: "과학", label: "과학" },
    ]
    @observable group = [
    	{ value: "", label: "전체" },
    ]
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
