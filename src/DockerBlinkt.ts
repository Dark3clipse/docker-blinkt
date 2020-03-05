/*-------------------------------------------------------------------------------
# Copyright 2019 Sophia Hadash
#
# Licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License (the "License"); you may not
# use this file except in compliance with the License.  You may obtain a copy
# of the License at
#
#   https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
# License for the specific language governing permissions and limitations under
# the License.
#-------------------------------------------------------------------------------*/
import Blinkt from "node-blinkt";


export default class DockerBlinkt{

	// SINGLETON PATTERN ////////////////////////////////////////////////////////
	/** Singleton instance */
	private static _inst: DockerBlinkt;
	/** @return BackendCLI singleton instance. */
	public static get getInst(): DockerBlinkt{
		return DockerBlinkt._inst || (DockerBlinkt._inst = new DockerBlinkt());
	}
	/////////////////////////////////////////////////////////////////////////////

	constructor(){

	}

	public start(): Promise<void>{
		console.log("Hello World!");

		let blinkt = new Blinkt();
		blinkt.setup();

		return Promise.resolve();
	}
}
