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

import {phxr_query_person_house, phxr_query_person_car} from '../../request/qzapi'
import {request} from '../../redux/actions/req'
import {pop} from '../../redux/nav'
//static displayName = Account
@connect(
    (state, props) => {
        //state:state.util.get()
        const item = props.scene.route.item
        const data = item.assetsType == '11' ? state.req.get("phxr_query_person_house")
            : state.req.get("phxr_query_person_car")
        return {data: data,}
    },
    (dispatch, props) =>({
        load: ()=> {
            dispatch(async(dispatch, getState)=> {
                const item = props.scene.route.item
                const uid = getState().login.data.userId
                // console.log('item:', item);
                if (item.assetsType == '11') {
                    const params = phxr_query_person_house(uid, item.assetsId)
                    await dispatch(request('phxr_query_person_house', params,(res)=>{
                        if(res.rspCode == '2003'){
                            pop()
                        }
                    }))
                } else if (item.assetsType == "10") {
                    const params = phxr_query_person_car(uid, item.assetsId)
                    await dispatch(request('phxr_query_person_car', params,(res)=>{
                        if(res.rspCode == '2003'){
                            pop()
                        }
                    }))
                }


            })

        }
        //...bindActionCreators({},dispatch),
    })
)
export  default  class Account extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        load: PropTypes.func.isRequired,
    };

    static defaultProps = {
        data: immutable.fromJS({
            data: {}
        })
    };

    componentDidMount() {
        this.props.load()
    }

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    _renderRow(title: string, des: string,unit:string ="", onPress: Function) {

        return (
            <View>
                <TouchableHighlight onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                        <View style={styles.row2}>
                            <Text style={styles.rowDesText}>
                                {des!=null ? des+ " " +unit : "未设置"}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    }

    _renderHouseView = ()=> {
        let data = this.props.data.toJS()
        data = data&& data.data || {}
        const houseType = ["个人住宅","商住两用","商铺","写字楼","别墅","停车位","自建房","动迁房",
            "经济适用房","预售房"]
        // console.log('data:', data);
        return (
            <View>
                {this._renderRow('房产地址', data.houseAddress,"", () => {
                })}

                {this._renderRow('所在城市', data.houseCity=='591'?"福州":"厦门","", () => {
                })}
                {this._renderRow('房地产类型', houseType[data.houseType],"", () => {
                })}
                {this._renderRow('已使用年限', data.serviceYears,"年", () => {
                })}
                {this._renderRow('产权面积', data.propertyArea,"平方", () => {
                })}
                {this._renderRow('实际使用面积', data.useArea, "平方",() => {
                })}
                {this._renderRow('所在建筑总层数', data.totalFloor,"层", () => {
                })}
                {this._renderRow('所处层数', data.positionFloor,"层", () => {
                })}
                {this._renderRow('是否有电梯', ["否", "是"][data.ifElevator], "",() => {
                })}
                {this._renderRow('是否有共有产权人', ["否", "是"][data.ifShare],"", () => {
                })}
                {this._renderRow('共有产权人的姓名', data.shareName,"", () => {
                })}
                {this._renderRow('所共有产权人的身份证', data.shareIdCardNo,"", () => {
                })}
                {this._renderRow('所共有产权人的电话', data.sharePhoneNo,"", () => {
                })}
                {this._renderRow('所共有产权人的关系', data.shareRelation,"", () => {
                })}

            </View>
        )

    }
    _renderCarView = ()=> {
        let data = this.props.data.toJS()
        data = data&& data.data || {}
        // console.log('test:', data);
        const carType = ["乘用车","客车","货车","牵引汽车"]

        return (
            <View>
                {this._renderRow('机动车类型', carType[data.carType], () => {
                })}

                {this._renderRow('使用性质', data.useType == "0"?"非营运":"营运","", () => {
                })}
                {this._renderRow('品牌', data.brand,"", () => {
                })}
                {this._renderRow('型号', data.model,"", () => {
                })}
                {this._renderRow('车牌号', data.plateNumber,"", () => {
                })}
                {this._renderRow('公里数', data.kilometers,"万公里", () => {
                })}
                {this._renderRow('出产日期', data.productionDate,"", () => {
                })}
                {this._renderRow('购买日期', data.buyDate, "",() => {
                })}
                {this._renderRow('总过户次数', data.totalTradeTimes,"次", () => {
                })}
                {this._renderRow('近一年内过户次数', data.tradeTimesOneYear, "次",() => {
                })}
                {this._renderRow('车管所抵押', data.pledge == "0"?"否":"是", "",() => {
                })}
                {this._renderRow('查封车', data.seized == "0"?"否":"是", "",() => {
                })}
                {this._renderRow('正常年检', data.annualVerification == "0"?"否":"是","", () => {
                })}
                {this._renderRow('黑牌车', data.blackPlate == "0"?"否":"是","", () => {
                })}

                {this._renderRow('所有人的姓名', data.ownerName ,"", () => {
                })}

                {this._renderRow('车辆所有人与本人关系', data.ownerRelation , "",() => {
                })}



            </View>)
    }

    render(): ReactElement<any> {


        const item = this.props.scene.route.item
        const assetsType = item.assetsType
        return (
            <ScrollView style={[this.props.style,styles.wrap]}>

                {assetsType == "11" ? this._renderHouseView():this._renderCarView()}


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
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 29 / 2,
        paddingRight: 23 / 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 14,
        // fontWeight: '500',
        color: blackFontColor,
    },
    rowDesText: {
        fontSize: 13,
        color: 'rgb(150,150,150)'
    },
    separator: {
        backgroundColor: '#bbbbbb',
        height: StyleSheet.hairlineWidth,
    },
})
