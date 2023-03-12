// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SessionGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//   return request.session.username !== undefined;
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminSessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.session.role;
    if (request.session.username !== undefined && userRole === 'admin') {
      return true;
    }
    return false;
  }
}