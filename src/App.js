import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Grademanage from './pages/Grademanage'
import Academy from './pages/Academy';
import NewTest from './pages/NewTest'
import StudentList from './pages/StudentList'
import NewStudent from './pages/NewStudent'
import GradeList from './pages/GradeList'
import NewGrade from './pages/NewGrade'
import NewGroup from './pages/NewGroup'
import TestModify from './pages/TestModify'
import StudentModify from './pages/StudentModify'
import InputScore from './pages/InputScore'
import StudentTest from './pages/StudentTest'
import FindId from './components/FindId'
import FindPw from './components/FindPw'
import PrintProvider from 'react-easy-print'
import PrintPage from './pages/PrintPage'
import PrintContent from './components/Print';
import EditUserInfo from './pages/EditUserInfo'
import Inf from './pages/Inf'
import TestList from './pages/TestList';
import VidList from './pages/VidList'
import NewVid from './pages/NewVid'
import NewMat from './pages/NewMat'
import MatList from './pages/MatList'
import NewInfGroup from './pages/NewInfGroup'
import VidDetail from './pages/VidDetail'
import StudentTestModify from './pages/StudentTestModify'

class App extends React.Component{
	render(){
		return(
			<PrintProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/account/login" component={Login}/>
						<Route exact path="/account/signup" component={Signup}/>
						<Route exact path="/account/findid" component={FindId}/>
						<Route exact path="/account/findpw" component={FindPw}/>
						<Route exact path="/account/edit" component={EditUserInfo}/>
						<Route exact path="/gm" component={Grademanage}/>
						<Route exact path="/ac" component={Academy}/>
						<Route exact path="/ac/test" component={TestList}/>
						<Route exact path="/ac/test/new" component={NewTest}/>
						<Route exact path="/ac/test/:testid/update" component={TestModify}/>
						<Route exact path="/ac/student" component={StudentList}/>
						<Route exact path="/ac/student/inputscore" component={InputScore}/>
						<Route exact path="/ac/student/new" component={NewStudent}/>
						<Route exact path="/ac/student/:studentid/update" component={StudentModify}/>
						<Route exact path="/ac/score/:scoreid/update" component={StudentTestModify}/>
						<Route exact path="/ac/student/:studentid" component={StudentTest}/>
						<Route exact path="/ac/grade/:testid" component={GradeList}/>
						<Route exact path="/ac/grade/new" component={NewGrade}/>
						<Route exact path="/ac/group/new" component={NewGroup}/>
						<Route exact path="/printpage" component={PrintPage}/>
						<Route exact path="/printpage/print" component={PrintContent}/>
						<Route exact path="/inf" component={Inf}/>
						<Route exact path="/inf/vid" component={VidList}/>
						<Route exact path="/inf/vid/new" component={NewVid}/>
						<Route exact path="/inf/mat" component={MatList}/>
						<Route exact path="/inf/mat/new" component={NewMat}/>
						<Route exact path="/inf/group/new" component={NewInfGroup}/>
						<Route exact path="/inf/vid/:vidid" component={VidDetail}/>
					</Switch>
				</BrowserRouter>
			</PrintProvider>
		)
	}
}

export default App