// import dashboardRoutes, {
// 	companyRoutes
// } from './dashboard.routes';



// export interface CompanyResponse{
//     name:string;
//     owner_id: number;
// }


// export interface UserResponse {
// 	id: number;
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	role: string;
//     company?:CompanyResponse
// }


// export function getUserFromLocalStorage(): UserResponse | null {
// 	return JSON.parse(localStorage.getItem('user') || '{}');
// }

// export function supportRender(): boolean {
// 	const userResponse = getUserFromLocalStorage();
// 	return (
// 		localStorage.getItem('supportRender') === 'true' &&
// 		!!userResponse &&
// 		!!userResponse.internal_user
// 	);
// }


// export function getDashboardRoutes():any[]{
//     if(supportRender()){
//         return true
//     }else{
//         return dashboardRoutes
//     }
// }