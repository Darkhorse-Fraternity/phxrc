/**
 * Created by lintong on 2017/2/3.
 * @flow
 */
'use strict';

import {backViewColor, blackFontColor, grayFontColor} from '../../configure';
import * as immutable from 'immutable';
import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import {phxr_query_person_credit } from '../../request/qzapi'
import {request} from '../../redux/actions/req'
//static displayName = Account
@connect(
    state =>({
        //state:state.util.get()
        data:state.req.get('phxr_query_person_credit')
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        load:()=>{
            dispatch(async (dispatch,getState)=>{
                const uid = getState().login.data.userId
                const params = phxr_query_person_credit(uid)
                await dispatch(request('phxr_query_person_credit',params))
            })

        }
    })
)
export  default  class Account extends Component {
    constructor(props: Object) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props.data, nextProps.data)
    }

    static propTypes = {};
    static defaultProps = {
        data:immutable.fromJS({
            data:{}
        })
    };

    componentDidMount() {
        this.props.load()
    }

    _renderRow(title: string, des: string, onPress: Function) {
        return (
            <View>
                <TouchableHighlight onPress={()=>onPress(title)}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                        <View style={styles.row2}>
                            <Text style={styles.dex} >{des != null?des:"没有数据"}</Text>
                        </View>
                    </View>

                </TouchableHighlight>
            </View>
        );
    }

    render(): ReactElement<any> {
        const data = this.props.data.toJS().data || {}
        const BUTTONS = ['0', '1', '2', '3', '4','5','6','6次以上'];
        return (
            <ScrollView style={[this.props.style,styles.wrap]}>
                {/*{this._renderRow('账号',this.props.userData.mobilePhoneNumber ,() => {

                 })}*/}
                <View style={styles.groupSpace}/>
                {this._renderRow('近一年是否有贷款及信用卡还款累计逾期次数', BUTTONS[data.totalOverdueTimesOneYear], () => {
                                })}
                <View style={styles.groupSpace}/>
                {this._renderRow('近两年是否有贷款及信用卡还款累计逾期次数', BUTTONS[data.totalOverdueTimesTwoYear], () => {
                                })}
                <View style={styles.groupSpace}/>
                {this._renderRow('近三年是否有贷款及信用卡还款累计逾期次数', BUTTONS[data.totalOverdueTimesThreeYear], () => {
                })}
                <View style={styles.groupSpace}/>
                {this._renderRow('5年内是否存在资产处置、担保代偿要求', ["是","否"][data.assetDisposalGuaranteeFiveYear], () => {})}
                <View style={styles.groupSpace}/>
                {this._renderRow('信用卡账户状态', ["正常","呆账","止付","冻结"][data.creditCardAccountState], () => {})}
                <View style={styles.groupSpace}/>
                {this._renderRow('信贷五级分类状态', ["正常","次级","可疑","损失"][data.creditFiveLevelState], () => {})}
                <View style={styles.groupSpace}/>
                {this._renderRow('对外担保贷款状态',["正常","次级","可疑","损失","无要求"][data.securedLoanState], () => {})}
                <View style={styles.groupSpace}/>
                {this._renderRow('近一个月贷款及信用卡审批查询次数', BUTTONS[data.approvalQueryTimesOneMonth], () => {})}
                <View style={styles.groupSpace}/>
                {this._renderRow('近三个月贷款及信用卡审批查询次数', BUTTONS[data.approvalQueryTimesThreeMonth], () => {})}
                <View style={styles.groupSpace}/>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    groupSpace: {
        height: 15 / 2,
    },
    row: {
        backgroundColor: 'white',
        padding: 29 / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 14,
        // fontWeight: '500',
        color: 'black',
        width:200,

    },
    rowDesText:{
        fontSize:17,
        color:'rgb(150,150,150)'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
})
