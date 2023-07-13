//
// Imports
//

import { FritterMiddlewareFunction } from "@fritter/core";

//
// Exports
//

/** A middleware that logs when requests start and end. */
export class FritterLogMiddleware
{
	/** The middleware function. */
	public readonly execute : FritterMiddlewareFunction;

	/** The number of requests that have been made. */
	private requestNumber : number;

	/** Constructs a new instance of the middleware. */
	public constructor()
	{
		this.requestNumber = 0;

		this.execute = async (context, next) =>
		{
			//
			// Increment Request Number
			//

			this.requestNumber += 1;

			//
			// Build Components
			//

			const components =
				[
					"Request " + this.requestNumber,
					context.fritterRequest.getHttpMethod(),
					context.fritterRequest.getPath(),
					"From " + context.fritterRequest.getIp(),
				];

			//
			// Start Log
			//

			console.log("[FritterLogMiddleware] " + components.join(" | ") + " | Start");

			//
			// Execute Next Middleware
			//

			await next();

			//
			// End Log
			//

			console.log("[FritterLogMiddleware] " + components.join(" | ") + " | End | Status Code: " + context.fritterResponse.getStatusCode());
		};
	}
}