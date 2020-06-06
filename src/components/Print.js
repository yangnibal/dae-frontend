import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx' 
import { Chart } from 'react-google-charts'
import html2canvas from 'html2canvas'
import './Print.scss'
import printJS from 'print-js'
import Logo from '../images/logo1.png'

@inject('store')
@observer
class PrintContent extends React.Component{

    @action Print = () => {
        console.log("print")
        html2canvas(document.querySelector("#print")).then(canvas => {
            printJS({
                printable: canvas.toDataURL("images/data"),
                type: "image"
            })
        })
    }

    render(){
        const { store } = this.props
        const chartOption1 = {
            vAxis: {
                minValue: 0,
                maxValue: 100
            }
        }
        const chartOption2 = {
            hAxis: {
                minValue: 0
            }
        }
        const props = store.printProps
        return(
            <div className="container" id="print" onClick={() => this.Print()}>
                <div className="sticky-container">
                    <div className="top-content">
                        <div className="top-content-header">
                            <div className="top-content-header-top">
                                <div className="top-content-header-top-title">학교별 <span>9</span>등급 상대평가 변환 성적표</div>
                            </div>
                            <div className="top-content-header-bottom">
                                <div className="top-content-header-bottom-test-type">{props.schoolyear} {props.test_type}</div>
                                <div className="top-content-header-bottom-name-grade-group">
                                    <div className="ngg">
                                        <div className="name">{props.name}</div>
                                        <div className="grade">{props.grade}</div>
                                        <div className="group">{props.group}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-content-body">
                            <div className="top-content-body-first">
                                <div className="top-content-body-title">9등급 상대평가<br/>변환 성적표란?</div>
                                <div className="top-content-body-text">9등급 상대평가는 현 입시제도에서 가장 명확하게 본인의 성적 등급을 확인 할 수 있는 성적산출 방법 입니다.<br/>본인의 백분율 확인을 통해 9등급 범위 안에서도 어느 등급에 더 가까운지 확인이 가능하며, 성적표가 나오지 않는<br/>[내신 기출 모의 테스트]에서도 본인의 성적을 예상 해 볼 수 있는 성적 지표 입니다.</div>
                            </div>
                            <div className="top-content-body-second">
                                <div className="top-content-body-title">9등급 상대평가 기준</div>
                                <div className="top-content-body-text">9등급 상대평가 구분 기준을 표기 합니다.</div>
                            </div>
                            <div className="table">
                                <div className="table-1">
                                    <div className="title">등급</div>
                                    <div className="content">1등급</div>
                                    <div className="content">2등급</div>
                                    <div className="content">3등급</div>
                                    <div className="content">4등급</div>
                                    <div className="content">5등급</div>
                                </div>
                                <div className="table-2">
                                    <div className="title">백분율</div>
                                    <div className="content">4% 이내</div>
                                    <div className="content">4%초과 11%이내</div>
                                    <div className="content">11%초과 23%이내</div>
                                    <div className="content">23%초과 40%이내</div>
                                    <div className="content">40%초과 60%이내</div>
                                </div>
                                <div className="table-3">
                                    <div className="title">등급</div>
                                    <div className="content">6등급</div>
                                    <div className="content">7등급</div>
                                    <div className="content">8등급</div>
                                    <div className="content">9등급</div>
                                </div>
                                <div className="table-4">
                                    <div className="title">백분율</div>
                                    <div className="content">60%초과 77%이내</div>
                                    <div className="content">77%초과 89%이내</div>
                                    <div className="content">89%초과 96%이내</div>
                                    <div className="content">96%초과 100%이내</div>
                                </div>
                                <div className="table-5">
                                    <div className="title">비고</div>
                                    <div className="content-end">등급은 현 입시 제도의<br/>평가기준과 동일 합니다.</div>
                                </div>
                            </div>
                            <div className="top-content-body-second">
                                <div className="top-content-body-title">성적표 해석 방법</div>
                                <div className="top-content-body-text">본인의 상대 평가 등급(1~9등급)을 확인 후 나의 백분위를 반드시 확인합니다. 나의 백분위가 등급컷 백분위보다 5% 이상<br/>높아야 안정적으로 해당 등급으로 판단 할 수 있습니다.</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="bottom-content-header">
                            <div className="bottom-content-header-left">
                                <div className="header-left-top">
                                    <div className="header-left-top-school">{props.school}</div>
                                    <div className="header-left-top-subject">{props.subject}</div>
                                </div>
                                <div className="header-left-bottom">9등급 상대평가 석차 등급</div>
                            </div>
                            <div className="bottom-content-header-middle">
                                <span>{props.rating}</span>
                                <div className="middle-text">등급</div>
                            </div>
                            <div className="bottom-content-header-right">
                                <div className="header-right-top">
                                    <div className="header-right-top-myscore">내점수</div>
                                    <div className="header-right-top-score">{props.score}</div>
                                </div>
                                <div className="header-right-bottom">
                                    <div className="header-right-bottom-z">
                                        <div className="header-right-bottom-z-top">z값</div>
                                        <div className="header-right-bottom-z-bottom">{props.z}</div>
                                    </div>
                                    <div className="header-right-bottom-prob">
                                        <div className="header-right-bottom-prob-top">확률 밀도</div>
                                        <div className="header-right-bottom-prob-bottom">{props.prob_dens}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-content-header-sec">
                            <div className="bottom-content-header-sec-rank">
                                <div className="red-title">나의 예상 등수</div>
                                <div className="red-content">{props.rank}</div>
                            </div>
                            <div className="bottom-content-header-sec-percent">
                                <div className="red-title">나의 백분위</div>
                                <div className="red-content">{props.percent}%</div>
                            </div>
                            <div className="bottom-content-header-sec-cand-num">
                                <div className="gray-title">응시자 인원</div>
                                <div className="gray-content">{props.cand_num}</div>
                            </div>
                            <div className="bottom-content-header-sec-average">
                                <div className="gray-title">학교 평균</div>
                                <div className="gray-content">{props.average}</div>
                            </div>
                            <div className="bottom-content-header-sec-std-dev">
                                <div className="gray-title">표준편차</div>
                                <div className="gray-content">{props.std_dev}</div>
                            </div>
                        </div>
                        <div className="bar-container">
                            <div className="chart-1">
                                <Chart
                                    width={"100%"}
                                    height={"92%"}
                                    chartType="Bar"
                                    data={[
                                        ["점수 비교", "점수"],
                                        ['평균', Number(props.average)],
                                        ['내점수', Number(props.score)]
                                    ]}
                                    options={chartOption1}
                                />
                            </div>
                            <div className="chart-2">
                                <Chart
                                    width={"100%"}
                                    height={"92%"}
                                    chartType="BarChart"
                                    data={[
                                        ["등수 비교", "등수"],
                                        ['응시자 인원', Number(props.cand_num)],
                                        ['예상 등수', Number(props.rank)]
                                    ]}
                                    options={chartOption2}
                                />
                            </div>
                        </div>
                        <div className="print-logo-container">
                            <div className="logo-sticky-container">
                                <img src={Logo} alt={Logo} className="logo-img-print"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrintContent