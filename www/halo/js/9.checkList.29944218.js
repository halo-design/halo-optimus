webpackJsonp([9],{798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return B});var a,i,c,r=n(400),l=(n.n(r),n(171)),o=n.n(l),u=n(805),s=(n.n(u),n(402)),d=n.n(s),p=n(399),m=(n.n(p),n(70)),f=n.n(m),h=n(813),g=(n.n(h),n(403)),k=n.n(g),b=n(3),y=n.n(b),v=n(105),w=(n.n(v),n(84)),E=n.n(w),S=n(30),C=n.n(S),I=n(4),N=n.n(I),M=n(7),j=n.n(M),x=n(5),D=n.n(x),L=n(6),V=n.n(L),O=n(809),P=(n.n(O),n(401)),R=n.n(P),z=n(0),F=n.n(z),_=n(37),A=n(32),q=n(106),T=n(842),W=n(812),J=n(420),K=R.a.Item,B=(a=Object(_.b)(function(e){var t=e.pages.checkList,n=t.checkList,a=t.checkListSelectOpt,i=t.checkListTotalNum;return{userMenu:e.public.menu.userMenu,checkList:n,checkListSelectOpt:a,totalNum:i}},function(e){return Object(A.b)({getCheckList:J.c,checkDecide:J.a},e)}),i=R.a.create(),a(c=i(c=function(e){function t(e){N()(this,t);var n=D()(this,(t.__proto__||C()(t)).call(this,e));return n.state={loading:!1,modalVisible:!1,reviewVisible:!1,type:"agree",currentItem:{},currentDetail:""},n}return V()(t,e),j()(t,[{key:"showSpin",value:function(){this.setState({loading:!0})}},{key:"hideSpin",value:function(){this.setState({loading:!1})}},{key:"applyDecide",value:function(e){var t=this;this.showSpin(),this.props.checkDecide(e,function(){return t.closeModal()},function(){return t.closeModal()})}},{key:"checkSubmit",value:function(){var e=this,t=this.state,n=t.currentItem,a=t.type,i=this.props.form,c=i.getFieldValue,r=i.validateFields,l={bsnCode:n.bsnCode,authFlag:0,actionType:1,flowId:n.flowId};"agree"!==a?r(function(t,n){t?E.a.error("填写内容有错误，请仔细填写!"):e.applyDecide(y()({},l,{authFlag:1,rejReason:c("rejReason")}))}):this.applyDecide(l)}},{key:"openRejectModal",value:function(e){this.setState({modalVisible:!0,currentItem:e,type:"reject"})}},{key:"openAgreeModal",value:function(e){console.log(e),this.setState({modalVisible:!0,currentItem:e,type:"agree"})}},{key:"closeModal",value:function(){this.setState({modalVisible:!1,currentItem:{}}),this.hideSpin(),this.props.form.resetFields()}},{key:"checkReview",value:function(e){this.setState({reviewVisible:!0,currentDetail:e.flowDetail})}},{key:"closeReview",value:function(){this.setState({reviewVisible:!1,currentItem:{}})}},{key:"componentWillMount",value:function(){this.props.getCheckList({currentPage:1,turnPageShowNum:10})}},{key:"render",value:function(){var e=this,t=this.props,n=t.form,a=t.userMenu,i=t.getCheckList,c=t.checkList,r=t.checkListSelectOpt,l=t.totalNum,u=n.getFieldDecorator,s=this.state,p=s.loading,m=s.currentItem,h=s.currentDetail,g=s.type,b=s.modalVisible,v=s.reviewVisible,w={labelCol:{span:6},wrapperCol:{span:14}},E=[{title:"审批流水号",dataIndex:"flowId",key:"flowId"},{title:"交易编号",dataIndex:"bsnCode",key:"bsnCode"},{title:"交易名称",dataIndex:"bsnName",key:"bsnName",render:function(t,n){return F.a.createElement("a",{onClick:function(t){e.checkReview(n)}},t)}},{title:"申请人编号",dataIndex:"applicantId",key:"applicantId"},{title:"申请人姓名",dataIndex:"applicantName",key:"applicantName"},{title:"更新日期",dataIndex:"updateDate",key:"updateDate",render:function(e,t){return F.a.createElement("span",null,Object(q.e)(e))}},{title:"操作",key:"operation",render:function(t,n){var i=[{item:"F006",button:F.a.createElement("a",{onClick:function(t){e.openAgreeModal(n)}},"同意")},{item:"F006",button:F.a.createElement("a",{onClick:function(t){e.openRejectModal(n)}},"驳回")}];return Object(q.c)(a,i)}}],S={total:Number(l),current:Number(r.currentPage),showSizeChanger:!0,pageSize:Number(r.turnPageShowNum),onShowSizeChange:function(e,t){i({currentPage:1,turnPageShowNum:t})},onChange:function(e){i({currentPage:e,turnPageShowNum:r.turnPageShowNum})}};return F.a.createElement("div",{className:"pageCheckList",style:{padding:"20px 30px"}},F.a.createElement(k.a,{rowKey:"flowId",bordered:!0,columns:E,dataSource:c,pagination:S}),F.a.createElement(o.a,{title:"同意审批",width:600,visible:b,onOk:this.checkSubmit,onCancel:function(t){return e.closeModal()},footer:[F.a.createElement(f.a,{key:"back",type:"ghost",size:"large",onClick:function(t){return e.closeModal()}},"返 回"),F.a.createElement(f.a,{key:"submit",type:"primary",size:"large",onClick:function(t){return e.checkSubmit()}},"确定")]},F.a.createElement(R.a,{layout:"horizontal"},F.a.createElement(K,y()({label:"审批流水号"},w),F.a.createElement("span",null,m.flowId)),F.a.createElement(K,y()({label:"交易名称"},w),F.a.createElement("span",null,m.bsnName)),"agree"!==g&&F.a.createElement(K,y()({label:"驳回理由"},w,{required:!0}),u("rejReason",{initialValue:"",rules:[{required:!0,message:"请填写驳回理由"}]})(F.a.createElement(d.a,{placeholder:"驳回理由",size:"large"})))),F.a.createElement(W.a,{loading:p})),F.a.createElement(o.a,{title:"交易详情",width:600,visible:v,onCancel:function(t){return e.closeReview()},footer:[F.a.createElement(f.a,{key:"back",type:"ghost",size:"large",onClick:function(t){return e.closeReview()}},"返 回")]},F.a.createElement("div",{style:{padding:"0 20px"}},F.a.createElement(T.a,{data:Object(q.o)(h)}))))}}]),t}(F.a.Component))||c)||c)},805:function(e,t,n){"use strict";n(83),n(815)},806:function(e,t,n){"use strict";n(83),n(816),n(805)},807:function(e,t,n){"use strict";n(83),n(817)},808:function(e,t){},809:function(e,t,n){"use strict";n(83),n(824),n(825)},810:function(e,t,n){"use strict";n(83),n(818)},811:function(e,t,n){"use strict";n(83),n(814)},812:function(e,t,n){"use strict";var a=n(807),i=(n.n(a),n(172)),c=n.n(i),r=n(0),l=n.n(r);t.a=function(e){var t=e.loading;return l.a.createElement("div",{className:"app-spin"},l.a.createElement(c.a,{size:"large",spinning:t}))}},813:function(e,t,n){"use strict";n(83),n(819),n(810),n(811),n(820),n(807),n(822)},814:function(e,t){},815:function(e,t){},816:function(e,t){},817:function(e,t){},818:function(e,t){},819:function(e,t){},820:function(e,t,n){"use strict";n(83),n(821),n(399)},821:function(e,t){},822:function(e,t,n){"use strict";n(83),n(823),n(806),n(805)},823:function(e,t){},824:function(e,t){},825:function(e,t,n){"use strict";n(83),n(808)},842:function(e,t,n){"use strict";var a=n(0),i=n.n(a),c=function(e){return e.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{style:{padding:"5px 0",textAlign:"right",fontWeight:"bold"}},e.key,"："),i.a.createElement("td",{style:{padding:"5px 0"}},e.value))})},r=function(e){var t=e.data;return i.a.createElement("table",null,i.a.createElement("tbody",null,c(t)))};t.a=r}});