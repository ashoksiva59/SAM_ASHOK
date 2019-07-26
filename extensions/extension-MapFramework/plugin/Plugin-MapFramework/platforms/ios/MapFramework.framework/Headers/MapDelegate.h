//
//  MapDelegate.h
//  MapFramework
//
//  Created by Patel, Hitesh on 1/26/17.
//  Copyright © 2017 SAP. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MapDelegate : NSObject
-(void) getObjects: (NSString *) dictionary type: (NSString *) type;
-(void) runAction: (NSString *) dictionary type: (NSString *) type;
@end
