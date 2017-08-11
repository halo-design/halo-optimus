webpackJsonp([10],{792:function(e,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t,r,l,c,i,s,o=n(400),u=(n.n(o),n(171)),h=n.n(u),d=n(826),m=(n.n(d),n(404)),p=n.n(m),b=n(827),f=(n.n(b),n(405)),E=n.n(f),g=n(805),v=(n.n(g),n(402)),k=n.n(v),y=n(399),C=(n.n(y),n(70)),S=n.n(C),B=n(3),I=n.n(B),V=n(105),F=(n.n(V),n(84)),N=n.n(F),w=n(30),z=n.n(w),L=n(4),_=n.n(L),O=n(7),A=n.n(O),P=n(5),D=n.n(P),j=n(6),M=n.n(j),q=n(834),T=(n.n(q),n(407)),R=n.n(T),x=n(806),W=(n.n(x),n(107)),H=n.n(W),K=n(809),J=(n.n(K),n(401)),U=n.n(J),$=n(0),G=n.n($),Q=n(37),X=n(32),Y=n(812),Z=n(412),ee=U.a.Item,ae=H.a.Option,ne=R.a.SHOW_PARENT,te=(t=Object(Q.b)(function(e){var a=e.pages.branchManage.addBranchBoxVisible,n=e.public.branchTree;return{visible:a,branchNodes:n.selectTreeBranchList,allBranchList:n.allBranchList}},function(e){return Object(X.b)({setAddBranchVisible:Z.setAddBranchVisible,branchAdd:Z.branchAdd},e)}),r=U.a.create(),t(l=r(l=function(e){function a(e){_()(this,a);var n=D()(this,(a.__proto__||z()(a)).call(this,e));return n.state={loading:!1},n}return M()(a,e),A()(a,[{key:"componentWillMount",value:function(){this.props.form.resetFields()}},{key:"onClose",value:function(){this.props.setAddBranchVisible(!1),this.onClear()}},{key:"onClear",value:function(){this.props.form.resetFields()}},{key:"onSubmit",value:function(){var e=this,a=this.props,n=a.form,t=a.allBranchList,r=a.branchAdd,l=n.getFieldsValue;(0,n.validateFields)(function(a,n){if(a)N.a.error("填写内容有错误，请仔细填写!");else{var c=l(),i="";switch(c.brhLevel){case"等级1":i="1";break;case"等级2":i="2";break;case"等级3":i="3"}var s=c.brhId,o="";t.map(function(e){s&&e.brhId===s&&(o=e.brhName)});var u=I()({},l(),{brhLevel:i,brhPName:o,brhParentId:s}),h=function(){e.setState({loading:!1})};!function(){e.setState({loading:!0})}(),r(u,function(){h(),e.onClear(),e.onClose()},h)}})}},{key:"phoneNumberCheck",value:function(e,a,n){/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(a)?n():n("请输入有效的手机号码！")}},{key:"render",value:function(){var e=this,a=this.props,n=a.visible,t=a.branchNodes,r=this.props.form.getFieldDecorator,l={labelCol:{span:6},wrapperCol:{span:16}},c=["等级1","等级2","等级3"].map(function(e){return G.a.createElement(ae,{key:e,value:e},e)}),i={dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:t,placeholder:"请选择所属机构",treeDefaultExpandAll:!0,treeCheckStrictly:!1,treeCheckable:!1,showCheckedStrategy:ne};return G.a.createElement("div",{className:"BranchAdd"},G.a.createElement(h.a,{title:"增加机构",width:600,visible:n,onOk:this.onSubmit,onCancel:function(a){return e.onClose()},footer:[G.a.createElement(S.a,{key:"back",type:"ghost",size:"large",onClick:function(a){return e.onClose()}},"返 回"),G.a.createElement(S.a,{key:"clean",type:"ghost",size:"large",onClick:function(a){return e.onClear()}},"清除所有"),G.a.createElement(S.a,{key:"submit",type:"primary",size:"large",onClick:function(a){return e.onSubmit()}},"提 交")]},G.a.createElement(U.a,{layout:"horizontal"},G.a.createElement(p.a,null,G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"机构名称："},l,{required:!0,hasFeedback:!0}),r("brhName",{initialValue:"",rules:[{required:!0,message:" "}]})(G.a.createElement(k.a,{placeholder:"请输入机构",size:"large"})))),G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"联系人："},l,{hasFeedback:!0}),r("brhPerson",{initialValue:""})(G.a.createElement(k.a,{placeholder:"请填写联系人",size:"large"}))))),G.a.createElement(p.a,null,G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"机构等级："},l,{required:!0,hasFeedback:!0}),r("brhLevel",{rules:[{required:!0,message:" "}]})(G.a.createElement(H.a,{placeholder:"请选择机构等级"},c)))),G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"联系电话："},l,{required:!0,hasFeedback:!0}),r("brhPhone",{initialValue:"",rules:[{validator:this.phoneNumberCheck}]})(G.a.createElement(k.a,{placeholder:"请输入联系电话",size:"large"}))))),G.a.createElement(p.a,null,G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"机构描述："},l,{hasFeedback:!0}),r("brhDesc",{initialValue:""})(G.a.createElement(k.a,{placeholder:"请填写机构描述",size:"large"})))),G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"地区编号："},l,{hasFeedback:!0}),r("brhRegionId",{initialValue:""})(G.a.createElement(k.a,{placeholder:"请输入地区编号",size:"large"}))))),G.a.createElement(p.a,null,G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"机构地址："},l,{hasFeedback:!0}),r("brhAddress",{initialValue:""})(G.a.createElement(k.a,{placeholder:"请填写机构地址",size:"large"})))),G.a.createElement(E.a,{span:12},G.a.createElement(ee,I()({label:"所属机构："},l),r("brhId",{initialValue:""})(G.a.createElement(R.a,I()({placeholder:"请选择所属机构"},i,{allowClear:!0}))))))),G.a.createElement(Y.a,{loading:this.state.loading})))}}]),a}(G.a.Component))||l)||l),re=n(826),le=(n.n(re),n(404)),ce=n.n(le),ie=n(827),se=(n.n(ie),n(405)),oe=n.n(se),ue=n(805),he=(n.n(ue),n(402)),de=n.n(he),me=n(399),pe=(n.n(me),n(70)),be=n.n(pe),fe=n(105),Ee=(n.n(fe),n(84)),ge=n.n(Ee),ve=n(30),ke=n.n(ve),ye=n(4),Ce=n.n(ye),Se=n(7),Be=n.n(Se),Ie=n(5),Ve=n.n(Ie),Fe=n(6),Ne=n.n(Fe),we=n(3),ze=n.n(we),Le=n(834),_e=(n.n(Le),n(407)),Oe=n.n(_e),Ae=n(806),Pe=(n.n(Ae),n(107)),De=n.n(Pe),je=n(400),Me=(n.n(je),n(171)),qe=n.n(Me),Te=n(809),Re=(n.n(Te),n(401)),xe=n.n(Re),We=n(0),He=n.n(We),Ke=n(37),Je=n(32),Ue=n(812),$e=n(106),Ge=n(412),Qe=xe.a.Item,Xe=qe.a.confirm,Ye=De.a.Option,Ze=Oe.a.SHOW_PARENT,ea=(c=Object(Ke.b)(function(e){var a=e.pages.branchManage.selectedObject,n=e.public;return{userMenu:n.menu.userMenu,selectedBranch:a,branchNodes:n.branchTree.selectTreeBranchList}},function(e){return Object(Je.b)(ze()({},Ge),e)}),i=xe.a.create(),c(s=i(s=function(e){function a(e){Ce()(this,a);var n=Ve()(this,(a.__proto__||ke()(a)).call(this,e));return n.state={brhId:0,loading:!1},n}return Ne()(a,e),Be()(a,[{key:"showSpin",value:function(){this.setState({loading:!0})}},{key:"hideSpin",value:function(){this.setState({loading:!1})}},{key:"addBranch",value:function(){this.props.setAddBranchVisible(!0)}},{key:"modBranch",value:function(){var e=this,a=this.props,n=a.form,t=a.selectedBranch,r=a.branchModify,l=a.changeBranchSelected,c=n.getFieldsValue,i=n.resetFields;!Object($e.i)(t)&&t.brhId?Xe({title:"确认修改这项内容？",content:"点击确认修改",onOk:function(){var a="",n=c();switch(n.brhLevel){case"等级1":a="1";break;case"等级2":a="2";break;case"等级3":a="3"}if(n=ze()({},c(),{brhLevel:a}),n.brhParentId||(n.brhParentId=""),t.brhId===n.brhParentId)ge.a.error("不允许选择当前机构为所属机构！");else{var s=function(){i(),l(n),e.hideSpin()};e.showSpin(),r(n,s,s)}}}):ge.a.warning("请先选择一个机构节点！")}},{key:"delBranch",value:function(){var e=this,a=this.props,n=a.form,t=a.selectedBranch,r=a.branchDelete,l=a.resetForm,c=n.getFieldsValue;!Object($e.i)(t)&&t.brhId?Xe({title:"确认删除这项内容？",content:"点击确认删除",onOk:function(){var a=c();e.showSpin(),r(a,function(){l(),e.hideSpin()},function(){e.hideSpin()})}}):ge.a.warning("请先选择一个机构节点！")}},{key:"componentWillUnmount",value:function(){this.props.resetForm()}},{key:"render",value:function(){var e=this,a=this.props,n=a.userMenu,t=a.form,r=a.selectedBranch,l=a.branchNodes,c=t.getFieldDecorator,i=t.resetFields,s=He.a.createElement(be.a,{size:"large",type:"primary",onClick:function(a){return e.addBranch()}},"新增机构"),o=He.a.createElement(be.a,{size:"large",onClick:function(a){return e.modBranch()}},"保存修改"),u=He.a.createElement(be.a,{size:"large",type:"danger",onClick:function(a){return e.delBranch()}},"删除机构"),h={labelCol:{span:6},wrapperCol:{span:12}},d=["等级1","等级2","等级3"].map(function(e){return He.a.createElement(Ye,{key:e,value:e},e)}),m={dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:l,placeholder:"请选择所属机构",treeDefaultExpandAll:!0,treeCheckStrictly:!1,treeCheckable:!1,showCheckedStrategy:Ze};return He.a.createElement("div",{className:"app-form-scan"},He.a.createElement("div",{className:"app-search-panel"},He.a.createElement("div",{className:"button-group"},He.a.createElement(be.a,{size:"large",type:"ghost",onClick:function(e){return i()}},"重置修改"),Object($e.c)(n,[{item:"F002",button:o},{item:"F001",button:s},{item:"F004",button:u}],!0)),He.a.createElement(te,null)),He.a.createElement(xe.a,{layout:"horizontal"},He.a.createElement(ce.a,null,He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"机构编号："},h,{required:!0}),c("brhId",{initialValue:r.brhId?r.brhId:""})(He.a.createElement(de.a,{placeholder:"请输入机构编号",size:"large",disabled:!0})))),He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"机构名称："},h,{required:!0}),c("brhName",{initialValue:r.brhName?r.brhName:""})(He.a.createElement(de.a,{placeholder:"请输入机构",size:"large"}))))),He.a.createElement(ce.a,null,He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"联系人："},h),c("brhPerson",{initialValue:r.brhPerson?r.brhPerson:""})(He.a.createElement(de.a,{placeholder:"请输入用户描述",size:"large"})))),He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"机构等级："},h,{required:!0}),c("brhLevel",{initialValue:function(){switch(r.brhLevel){case"1":return"等级1";case"2":return"等级2";case"3":return"等级3";default:return r.brhLevel}}()})(He.a.createElement(De.a,{placeholder:"请选择机构等级"},d))))),He.a.createElement(ce.a,null,He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"联系电话："},h),c("brhPhone",{initialValue:r.brhPhone})(He.a.createElement(de.a,{placeholder:"请输入联系电话",size:"large"})))),He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"机构描述："},h),c("brhDesc",{initialValue:r.brhDesc?r.brhDesc:""})(He.a.createElement(de.a,{placeholder:"请填写机构描述",size:"large"}))))),He.a.createElement(ce.a,null,He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"地区编号："},h),c("brhRegionId",{initialValue:r.brhRegionId?r.brhRegionId:""})(He.a.createElement(de.a,{placeholder:"请输入地区编号",size:"large"})))),He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"机构地址："},h),c("brhAddress",{initialValue:r.brhAddress?r.brhAddress:""})(He.a.createElement(de.a,{placeholder:"请输入机构地址",size:"large"}))))),He.a.createElement(ce.a,null,He.a.createElement(oe.a,{span:12},He.a.createElement(Qe,ze()({label:"所属机构："},h),c("brhParentId",{initialValue:r.brhParentId||""})(He.a.createElement(Oe.a,ze()({},m,{allowClear:!0}))))))),He.a.createElement(Ue.a,{loading:this.state.loading}))}}]),a}(He.a.Component))||s)||s);n.d(a,"default",function(){return Fa});var aa,na,ta=n(826),ra=(n.n(ta),n(404)),la=n.n(ra),ca=n(827),ia=(n.n(ca),n(405)),sa=n.n(ia),oa=n(30),ua=n.n(oa),ha=n(4),da=n.n(ha),ma=n(7),pa=n.n(ma),ba=n(5),fa=n.n(ba),Ea=n(6),ga=n.n(Ea),va=n(0),ka=n.n(va),ya=n(37),Ca=n(32),Sa=n(841),Ba=n(835),Ia=n(177),Va=n(412),Fa=(aa=Object(ya.b)(function(e){var a=e.pages.branchManage.brhId;return{treeBranchList:e.public.branchTree.treeBranchList,branchId:a}},function(e){return Object(Ca.b)({initBranchList:Ia.b,changeBranchSelected:Va.changeBranchSelected,resetForm:Va.resetForm},e)}))(na=function(e){function a(e){da()(this,a);var n=fa()(this,(a.__proto__||ua()(a)).call(this,e));return n.onSearch=n.onSearch.bind(n),n}return ga()(a,e),pa()(a,[{key:"componentWillMount",value:function(){var e=this.props,a=e.initBranchList;(0,e.resetForm)(),a()}},{key:"onSearch",value:function(e){this.props.changeBranchSelected({brhId:"",brhName:e})}},{key:"render",value:function(){var e=this.props,a=e.changeBranchSelected,n=e.treeBranchList,t=e.branchId;return ka.a.createElement("div",{className:"pageBranchManage"},ka.a.createElement(la.a,null,ka.a.createElement(sa.a,{span:5},ka.a.createElement("div",{className:"app-left-side"},ka.a.createElement(Ba.a,{placeholder:"请输入搜索机构名称",initialValue:"",onSearch:this.onSearch}),ka.a.createElement(Sa.a,{selectedKeys:[t],selected:a,branchList:n}))),ka.a.createElement(sa.a,{span:19},ka.a.createElement(ea,null))))}}]),a}(ka.a.Component))||na},805:function(e,a,n){"use strict";n(83),n(815)},806:function(e,a,n){"use strict";n(83),n(816),n(805)},807:function(e,a,n){"use strict";n(83),n(817)},808:function(e,a){},809:function(e,a,n){"use strict";n(83),n(824),n(825)},811:function(e,a,n){"use strict";n(83),n(814)},812:function(e,a,n){"use strict";var t=n(807),r=(n.n(t),n(172)),l=n.n(r),c=n(0),i=n.n(c);a.a=function(e){var a=e.loading;return i.a.createElement("div",{className:"app-spin"},i.a.createElement(l.a,{size:"large",spinning:a}))}},814:function(e,a){},815:function(e,a){},816:function(e,a){},817:function(e,a){},824:function(e,a){},825:function(e,a,n){"use strict";n(83),n(808)},826:function(e,a,n){"use strict";n(83),n(808)},827:function(e,a,n){"use strict";n(83),n(808)},828:function(e,a,n){"use strict";n(83)},834:function(e,a,n){"use strict";n(83),n(840),n(806),n(811)},835:function(e,a,n){"use strict";n.d(a,"a",function(){return z});var t,r,l=n(805),c=(n.n(l),n(402)),i=n.n(c),s=n(828),o=(n.n(s),n(25)),u=n.n(o),h=n(105),d=(n.n(h),n(84)),m=n.n(d),p=n(30),b=n.n(p),f=n(4),E=n.n(f),g=n(7),v=n.n(g),k=n(5),y=n.n(k),C=n(6),S=n.n(C),B=n(809),I=(n.n(B),n(401)),V=n.n(I),F=n(0),N=n.n(F),w=V.a.Item,z=(t=V.a.create())(r=function(e){function a(){return E()(this,a),y()(this,(a.__proto__||b()(a)).apply(this,arguments))}return S()(a,e),v()(a,[{key:"render",value:function(){var e=this.props,a=e.form,n=e.placeholder,t=e.initialValue,r=e.onSearch,l=a.getFieldDecorator,c=a.getFieldsValue;return N.a.createElement("div",{className:"app-input-search"},N.a.createElement(V.a,{layout:"inline"},N.a.createElement(w,null,l("keyword",{initialValue:t})(N.a.createElement(i.a,{addonAfter:N.a.createElement(u.a,{type:"search",onClick:function(e){var a=c().keyword;a.trim()?r(a):m.a.warning("请输入搜索关键字！")}}),placeholder:n})))))}}]),a}(F.Component))||r},838:function(e,a,n){"use strict";n(83),n(839),n(811)},839:function(e,a){},840:function(e,a){},841:function(e,a,n){"use strict";var t=n(838),r=(n.n(t),n(415)),l=n.n(r),c=n(0),i=n.n(c),s=l.a.TreeNode,o=function e(a){return a.children.length>=1?i.a.createElement(s,{title:a.name,key:a.id},a.children.map(e)):i.a.createElement(s,{title:a.name,key:a.id,isLeaf:!0})},u=function(e){var a=e.selected,n=e.branchList,t=e.selectedKeys;return n?i.a.createElement("div",{className:"app-barnch-tree"},i.a.createElement(l.a,{showLine:!0,selectedKeys:t||[],onSelect:function(e,n){a({brhId:e[0],title:n.node.props.title})}},n.map(o))):null};a.a=u}});