//
//  MCFileWriterUtil.m
//  CustomSwiftComponent
//
//  Original MCFileWriterUtil written in Objective C by Jay Garcia
//  http://moduscreate.com/react_native_custom_components_ios/
//
//  Created by Kevin deLeon on 5/28/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

// This works pretty much like the React Native documentation said it would.
// https://facebook.github.io/react-native/docs/nativemodulesios.html#content

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MCFileWriterUtil, NSObject)

RCT_EXTERN_METHOD(writeFile:(NSString *)fileName withContents:(NSString *)contents errorCallback:(RCTResponseSenderBlock *)failureCallback callback:(RCTResponseSenderBlock *)successCallback)

RCT_EXTERN_METHOD(readFile:(NSString *)fileName errorCallback:(RCTResponseSenderBlock *)failureCallback callback:(RCTResponseSenderBlock *)successCallback)

@end
