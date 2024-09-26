export default function Contact(){
    return(<>
    
    <div class="h-screen backdrop-blur-2xl  flex flex-col justify-center w-full">
        <div class=" pt-5 sm:max-w-xl sm:mx-auto w-full ">

            <div class="text-white relative border-l border-b p-20 mt-10 md:p-5 w-full  bg- shadow-lg rounded-3xl">
    
                <div class="text-center pb-6">
                    <h1 class="text-3xl">Contact me</h1>
    
                    <p class="text-gray-300">
                        Fill up the form below to send us a message.
                    </p>
                </div>
    
                <form className="w-full">
    
                    <input
                            class=" bg-transparent shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Name" name="name"/>
    
                    <input
                            class=" bg-transparent shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            type="email" placeholder="Email" name="email"/>
    
                    <input
                            class=" bg-transparent shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Subject" name="_subject"/>
    
                    <textarea
                            class=" bg-transparent shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Type your message here..." name="message"></textarea>
    
                    <div class="flex justify-between">
                        <input
                            class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" value="Send ➤"/>
                        <input
                            class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="reset"/>
                    </div>
    
                </form>
            </div>
        </div>
    </div>

    </>)
}