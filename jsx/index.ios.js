'use strict';
 
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight
} = React;
 
var {
    // Demand in the auto-generated JavaScript class for our ObjC class
    MCFileWriterUtil
} = require('NativeModules');
 
var CustomSwiftComponent = React.createClass({
    
    // Generate the initial state of the view.
    getInitialState : function() {
        return {
            // textInput seemed like it should have an initial state, so I moved it here.
            textInputValue : null,
            resultsText : 'Nothing has happened yet :('
        }
    },
 
    // Executed when the TouchableHighlight "Save" button is pressed
    onSavePress : function() {
        var fileName     = this.state.textInputValue,      // What file name to write?
            fileContents = Math.random().toString(); // This goes into the file
 
        MCFileWriterUtil.writeFile(
            fileName,
            fileContents,
            // errorCallback
            (results) => {
                alert('Error: ' + results.errMsg);
            },
            // successCallback
            (results) => {
                var resultsText = 'Saved to ' + fileName + '. Press load to see contents.';
                
                // Update the state of the view
                this.setState({
                    resultsText : resultsText
                });
            }
        );
    },
 
    // Executed when the TouchableHighlight "Load" button is pressed
    onLoadPress : function() {
        // File name from text input
        var fileName = this.state.textInputValue; 
        
        MCFileWriterUtil.readFile(
            fileName,                     
            //errorCallback
            (results) => {
                alert('Error: ' + results.errMsg);
            },
            // successCallback
            (results) => {
                var resultsText = 'Contents of ' + fileName + ': ' + results.contents;
               
                // Update the state of the view
                this.setState({
                    resultsText : resultsText
                });
            }
        );
 
    },
    
    // Handler for the TextInput onChange event -- changed a bit to setState
    onTextInputChange : function(event) {
        this.setState({
            textInputValue : event.nativeEvent.text
        });
    },
 
    render: function() {
        // I didn't really see a point in definiing a var to hold this.state so I removed it

        return (
            <View style={styles.container}>
 
                {/*  Title container */}
                <Text style={styles.instructionsText}>
                    Custom React Native Utility Demo
                </Text>
                <View style={styles.separator}/>
 
                {/*  Container for input field */}
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        File Name : 
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        ref="textInput"
                        onChange={this.onTextInputChange}
                    />
                </View>
 
                {/*  Container for isave and load buttons */}
                <View style={styles.buttonContainer}> 
                    <TouchableHighlight 
                        style={styles.touchableHighlight} 
                        underlayColor="#99AA99" 
                        onPress={this.onLoadPress}>
                            <View style={[styles.buttonBox, styles.loadButtonBox]}>
                                <Text style={styles.buttonText}>
                                    Load
                                </Text>
                            </View>
                    </TouchableHighlight>
 
                    <TouchableHighlight 
                            underlayColor="#AA9999"
                            onPress={this.onSavePress}>
                                <View style={[styles.buttonBox, styles.saveButtonBox]}>
                                    <Text style={styles.buttonText}>
                                        Save
                                    </Text>
                                </View>
                    </TouchableHighlight>
                </View>
                
                {/*  Container for an output view */}
                <View style={styles.outputContainer}>
                    <Text style={styles.outputText} ref="outputContainer">
                        {this.state.resultsText}
                    </Text>
                </View>
 
            </View>
        );
    }
});
 
var styles = StyleSheet.create({    
    container: {  
        flex            : 1,
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        paddingTop      : 30
    },
 
    instructionsText : {
        fontSize : 20
    },
 
    separator : {
        borderWidth  : .5,
        borderColor  : '#AEAEAE',
        height       : 1,
        width        : 300,
        marginBottom : 25
    },
 
    labelContainer : {
        flexDirection  : 'row',
        width          : 300
    },
 
    labelText : {
        paddingRight : 10,
        fontSize     : 18
    },
    
    textInput : {
        height      : 26,
        borderWidth : 0.5,
        borderColor : '#0f0f0f',
        padding     : 4,
        flex        : 1,
        fontSize    : 13,
    },
 
    buttonContainer : {
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        marginTop      : 20
    },
    
    touchableHighlight : {
        marginLeft  : 10,
        marginRight : 10,
    },
    
    buttonBox : {
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        padding        : 10,
        borderWidth    : 2,
        borderRadius   : 5
    },
 
    saveButtonBox : {
        borderColor : '#AA0000'
    },
 
    loadButtonBox : {
        borderColor : '#00AA00'
    },
 
    buttonText : {
        fontSize : 16,
    },
 
    outputContainer : {
        width          : 300,
        height         : 200,
        justifyContent : 'center',
        alignItems     : 'center',
        borderWidth    : .5,
        borderColor    : "#999999",
        marginTop      : 20
    }
});
 
AppRegistry.registerComponent('CustomSwiftComponent', () => CustomSwiftComponent);