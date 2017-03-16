/**
 * Created by lintong on 2017/2/2.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as immutable from 'immutable';
import {List, InputItem} from 'antd-mobile';
import {phxr_financing_apply,phxr_query_financing_list} from '../../request/qzapi'
import {request} from '../../redux/actions/req'
import {Toast} from '../../util'
const Item = List.Item;
const Brief = Item.Brief;
//static displayName = Financing
import {pop} from '../../redux/nav'
@connect(
    state =>({
        //state:state.util.get()
        data:state.req.get('phxr_financing_apply')
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        load:()=>{
            dispatch(async (dispatch,getState)=>{
                const uid = getState().login.data.userId
                const params = phxr_financing_apply(uid)
                await dispatch(request('phxr_financing_apply',params,(res)=>{
                    if(res.rspCode == '0000'){

                        Alert.alert(
                            '申请成功，请等待咨询顾问联系您',
                            "",
                            [
                                {text: '确定', onPress: () => {}},
                            ]
                        )
                        const params = phxr_query_financing_list("0",uid)
                        dispatch(request('phxr_query_financing_list',params))
                    }else {
                        pop()
                    }
                }))


            })

        }
    })
)
export  default  class Financing extends Component {
    constructor(props: Object) {
        super(props);
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

    render(): ReactElement<any> {
        const data = this.props.data.toJS().data || {}
        console.log('test:', data);
        return (
            <View style={[this.props.style,styles.wrap]}>
                <List>
                    <Item extra={data.name} multipleLine>
                        融资咨询顾问
                    </Item>
                    <Item extra={data.telNum} multipleLine>
                        联系方式
                    </Item>
                    <Item extra={data.homeCity == "591"?"福州":"厦门"} multipleLine>
                        服务地区
                    </Item>
                    <Item extra={data.createTime} multipleLine>
                        注册时间
                    </Item>
                    <Item extra={data.serviceTimes} multipleLine>
                        已成功服务次数
                    </Item>
                    <Item extra={data.serviceLevel} multipleLine>
                        服务星级
                    </Item>

                    <Item extra={data.responseTime} multipleLine>
                        平均响应时间
                    </Item>
                    <Item extra={data.financeDepartmant} multipleLine>
                        所属融资咨询机构
                    </Item>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
})
