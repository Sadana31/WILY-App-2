import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            buttonState: "normal",
            scannedData: "",
            scannedBookId: "",
            scannedStudentId: "",
        }
    }

    handleBarCodeScanned=async({type,data})=>{
        const {buttonState} = this.state;
        if(buttonState==="BookId"){
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: "normal",
            })
        }
        else if(buttonState==="StudentId"){
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: "normal",
            })
        }
    }

    getCameraPermissions=async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
       this.setState({
            /* status==="granted" is True when user has granted permissions
            status==="granted" is False when user has not granted permissions */
            hasCameraPermissions: status==="granted",
            buttonState: id,
            scanned: false,            
       })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState!=="normal" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned ?undefined :this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        else if (buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <View>
                        <Image source={require("../assets/booklogo.jpg")}
                        style={{width: 200, height:200,}}/>
                        <Text style={{textAlign: "center", fontSize: 30}}>
                            WILY
                        </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                        placeholder="Book ID"
                        value = {this.state.scannedBookId}/>
                        <TouchableOpacity style={styles.scanButton} 
                        onPress={()=>{
                            this.getCameraPermissions("BookId");
                        }}>
                            <Text style={styles.buttonText}>
                                SCAN
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                        placeholder="Student ID"
                        value = {this.state.scannedStudentId}/>
                        <TouchableOpacity style={styles.scanButton}
                        onPress={()=>{
                            this.getCameraPermissions("StudentId");
                        }}>
                            <Text style={styles.buttonText}>
                                SCAN
                            </Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    scanButton: {
        backgroundColor: "#2196f3",
        width: 50,
        borderWidth: 1.5
    },
    displayText: {
        fontSize:15,
        textDecorationLine: "underline",
    },
    container: {
        flex: 1,
         justifyContent: "center", 
         alignItems: "center"
    },
    buttonText: {
        fontSize:15,
        textDecorationLine: "underline",
        textAlign: "center",
        marginTop: 20,
    },
    inputView: {
        flexDirection: "row",
        margin: 20,
    },
    inputBox: {
        width: 200,
        height: 50,
        borderWidth: 1.5,
        fontSize: 20,
    }
})