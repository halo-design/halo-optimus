webpackJsonp([12],{799:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return j});var i,a,r=n(400),o=(n.n(r),n(171)),s=n.n(o),u=n(813),c=(n.n(u),n(403)),l=n.n(c),d=n(399),m=(n.n(d),n(70)),f=n.n(m),h=n(30),g=n.n(h),p=n(4),y=n.n(p),b=n(7),k=n.n(b),v=n(5),w=n.n(v),T=n(6),S=n.n(T),N=n(829),x=(n.n(N),n(410)),E=n.n(x),L=n(0),C=n.n(L),I=n(37),P=n(32),D=n(106),O=n(421),M=E.a.RangePicker,j=(i=Object(I.b)(function(e){var t=e.pages.checkHistoryList;return{historyList:t.historyList,historyListSelectOpt:t.historyListSelectOpt,totalNum:t.historyListTotalNum}},function(e){return Object(P.b)({getHistoryList:O.b},e)}))(a=function(e){function t(e){y()(this,t);var n=w()(this,(t.__proto__||g()(t)).call(this,e));return n.state={beginTime:"",endTime:"",showDetail:!1,detailparams:""},n}return S()(t,e),k()(t,[{key:"resetStateList",value:function(){this.props.getHistoryList({currentPage:1,turnPageShowNum:10,beginTime:"",endTime:""})}},{key:"initTable",value:function(){this.setState({beginTime:"",endTime:""}),this.resetStateList()}},{key:"stateReview",value:function(e){this.setState({showDetail:!0,detailparams:e.flowDetail})}},{key:"onCloseModal",value:function(){this.setState({showDetail:!1})}},{key:"componentWillMount",value:function(){this.resetStateList()}},{key:"render",value:function(){var e=this,t=this.props,n=t.getHistoryList,i=t.historyList,a=t.historyListSelectOpt,r=t.totalNum,o=[{title:"授权流水号",dataIndex:"hisId",key:"hisId"},{title:"审批流水号",dataIndex:"flowId",key:"flowId"},{title:"交易编号",dataIndex:"bsnCode",key:"bsnCode"},{title:"交易名称",dataIndex:"bsnName",key:"bsnName",render:function(t,n){return C.a.createElement("a",{onClick:function(t){return e.stateReview(n)}},t)}},{title:"授权人编号",dataIndex:"cstNo",key:"cstNo"},{title:"授权人姓名",dataIndex:"cstName",key:"cstName"},{title:"授权结果",dataIndex:"authFlag",key:"authFlag",render:function(e,t){return"0"===e||0===e?C.a.createElement("span",null,"同意"):C.a.createElement("span",null,"驳回")}},{title:"授权时间",dataIndex:"authTime",key:"authTime",render:function(e,t){return C.a.createElement("span",null,Object(D.e)(e))}},{title:"驳回原因",dataIndex:"rejReason",key:"rejReason"}],u={total:Number(r),current:Number(a.currentPage),showSizeChanger:!0,pageSize:Number(a.turnPageShowNum),onShowSizeChange:function(t,i){n({currentPage:1,turnPageShowNum:i,beginTime:e.state.beginTime,endTime:e.state.endTime})},onChange:function(t){n({currentPage:t,turnPageShowNum:a.turnPageShowNum,beginTime:e.state.beginTime,endTime:e.state.endTime})}},c=function(t,i){var r=i[0].replace(/-/g,""),o=i[1].replace(/-/g,"");e.setState({beginTime:r,endTime:o}),n({currentPage:1,turnPageShowNum:a.turnPageShowNum,beginTime:r,endTime:o})},d=function(e){return e&&e.valueOf()>Date.now()},m=function(e){var t=e.split(","),n=[];return t.map(function(e){var t={},i=e.split("="),a=i[0],r=i[1];a||(a="未知"),r?(t.key=a,r.indexOf(":")>0&&(r=r.replace(/:/g,"， ")),t.value=r,n.push(t)):n.push({key:a,value:"暂无"})}),n};return C.a.createElement("div",{className:"applyHistoryList",style:{padding:"20px 30px"}},C.a.createElement("div",{style:{width:"100%",paddingBottom:"20px",height:"48px"}},C.a.createElement(f.a,{onClick:function(t){return e.initTable()}},"重置"),C.a.createElement(M,{style:{float:"right"},format:"YYYY-MM-DD",disabledDate:d,onChange:c})),C.a.createElement("div",{className:"app-narrow-table"},C.a.createElement(l.a,{rowKey:"hisId",bordered:!0,columns:o,dataSource:i,pagination:u})),C.a.createElement(s.a,{visible:this.state.showDetail,title:"交易详情",onCancel:function(t){return e.onCloseModal()},footer:[C.a.createElement(f.a,{key:"back",type:"ghost",size:"large",onClick:function(t){return e.onCloseModal()}},"关闭")]},C.a.createElement("div",{style:{padding:"0 20px"}},C.a.createElement("table",null,C.a.createElement("tbody",null,function(e){return m(e).map(function(e,t){return C.a.createElement("tr",{key:t},C.a.createElement("td",{style:{padding:"5px 0",textAlign:"right",fontWeight:"bold"}},e.key,"："),C.a.createElement("td",{style:{padding:"5px 0"}},e.value))})}(this.state.detailparams))))))}}]),t}(C.a.Component))||a},805:function(e,t,n){"use strict";n(83),n(815)},806:function(e,t,n){"use strict";n(83),n(816),n(805)},807:function(e,t,n){"use strict";n(83),n(817)},810:function(e,t,n){"use strict";n(83),n(818)},811:function(e,t,n){"use strict";n(83),n(814)},813:function(e,t,n){"use strict";n(83),n(819),n(810),n(811),n(820),n(807),n(822)},814:function(e,t){},815:function(e,t){},816:function(e,t){},817:function(e,t){},818:function(e,t){},819:function(e,t){},820:function(e,t,n){"use strict";n(83),n(821),n(399)},821:function(e,t){},822:function(e,t,n){"use strict";n(83),n(823),n(806),n(805)},823:function(e,t){},829:function(e,t,n){"use strict";n(83),n(830),n(805),n(831)},830:function(e,t){},831:function(e,t,n){"use strict";n(83),n(832),n(805)},832:function(e,t){}});