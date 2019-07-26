//
//  MapBridge.h
//  MapFramework
//
//  Created by Mehta, Kunal on 12/9/16.
//  Copyright © 2016 SAP. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MapDelegate.h"

typedef void (^MapBridgeCallback)(NSDictionary* dictionary, NSString* type);

@interface MapBridge : NSObject

@property (nonatomic, copy) MapBridgeCallback callback;

-(UIViewController*) createWithParams:(NSDictionary*)params andDelegate:(MapDelegate*)delegate;

-(BOOL) isClientIdAvailable;

@end
