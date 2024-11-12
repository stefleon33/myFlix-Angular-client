import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define the application's routes.
// The 'routes' array will hold the route configuration for the app.
const routes: Routes = [];

@NgModule({
  /**
   * The 'imports' array includes the RouterModule, which is used to configure routing for the app.
   * `forRoot()` is used to configure the router at the root level of the application with the defined routes.
   * Since there are no routes defined in this case, it's an empty array.
   */
  imports: [RouterModule.forRoot(routes)],
  /**
   * The 'exports' array makes the RouterModule available for use in other parts of the app,
   * specifically in the root module, allowing components to access routing functionality.
   */
  exports: [RouterModule]
})
export class AppRoutingModule { }
