import { observable, action } from 'mobx'
import axios from 'axios'

export default class Store{

    @observable isModalOn = false
    @observable headers = {
        headers: {
            Authorization: "Token " + this.getToken()
        }
    }

    @action handleModal = () => {
        this.isModalOn = !this.isModalOn
    }

    @action postSomeThing = (url, formData, doRes, doErr) => {
        axios.post(url, formData, this.headers)
        .then(res => doRes(res))
        .catch(err => doErr(err))
    }
    @action getSomeThing = (url, doRes, doErr) => {
        axios.get(url, this.headers)
        .then(res => doRes(res))
        .catch(err => doErr(err))
    }
    @action putSomeThing = (url, data, doRes, doErr) => {
        axios.put(url, data, this.headers)
        .then(res => doRes(res))
        .catch(err => doErr(err))
    }
    @action delSomeThing = (url, doRes, doErr) => {
        axios.delete(url, this.headers)
        .then(res => doRes(res))
        .catch(err => doErr(err))
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
        var data = {type: type}
        function doRes(res){
            if(res.data==="cansaveit"){
                doSomething()
                console.log(res.data)
            }
            else if(res.data==="canuseit"){
                doSomething()
                console.log(res.data)
            } else {
                console.log(res.data)
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        }
        function doErr(err){
            
        }
        this.postSomeThing("https://api.daeoebi.com/users/caniuse/", data, doRes, doErr)
    }


    @observable tests = []
    @action getMyTest = () => {
        const doSomething = () => {
            const semester = []
            axios.get("https://api.daeoebi.com/tests/getmytest/", {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.tests = res.data
                for(var i in res.data){
                    semester.push({value: res.data[i]['additional_info'], label: res.data[i]['additional_info']})
                }
                this.semester = semester
            })
            .catch(err => {})
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
            .catch(err => {})
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
            .catch(err => {})
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
            .catch(err => {})
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
            .catch(err => {})
        }
        this.caniuse(2, doSomething)
    }
    @action findfile = (subject, grade, group) => {
        const doSomething = () => {
            axios.post("https://api.daeoebi.com/files/findfile/", ({
                subject: subject,
                grade: grade,
                group: group
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.files = res.data
            })
            .catch(err => {
                console.log(err)
            })
        }
        this.caniuse(1, doSomething)
    }
    @action findprintfile = (subject, grade, group) => {
        const doSomething = () => {
            axios.post("https://api.daeoebi.com/printfiles/findfile/", ({
                subject: subject,
                grade: grade,
                group: group
            }), {
                headers: {
                    Authorization: "Token " + this.getToken()
                }
            })
            .then(res => {
                this.files = res.data
            })
            .catch(err => {
                console.log(err)
            })
        }
        this.caniuse(1, doSomething)
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
            .catch(err => {})
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
        .catch(err => {})
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
     
    @observable files = []
    @action getFiles = () => {
        var data = {type: 1}
        var self = this
        function doRes(res){
            console.log(res.data)
            localStorage.setItem("authority", res.data)
            axios.get("https://api.daeoebi.com/files/", {
                headers: {
                    Authorization: "Token " + self.getToken()
                }
            })
            .then(res => {
                self.files = res.data['results'] 
            })
            .catch(err => {
                console.log(err)
            })
        }
        function doErr(err){alert("접근 권한이 없습니다.")}
        this.postSomeThing("https://api.daeoebi.com/users/caniuse/", data, doRes, doErr)
    }
    @observable printfiles = []
    @action getPrintFiles = () => {
        var data = {type: 3}
        var self = this
        function doRes(res){
            console.log(res.data)
            localStorage.setItem("authority", res.data)
            axios.get("https://api.daeoebi.com/printfiles/", {
                headers: {
                    Authorization: "Token " + self.getToken()
                }
            })
            .then(res => {
                self.printfiles = res.data['results'] 
            })
            .catch(err => {
                console.log(err)
            })
        }
        function doErr(err){alert("접근 권한이 없습니다.")}
        this.postSomeThing("https://api.daeoebi.com/users/caniuse/", data, doRes, doErr)
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
        { value: "", label: "전체" }
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
