**Issue**

When this is started with ```node index.js``` it all seems to work fine the first few times you upload ```uploads/stations_1402064401590.csv```.  The expected result is "458", however after a 3-4 uploads the return value seems to be fairly random with values like 128 and 322.

This is actually part of a larger project but I have condensed the code for the purpose of this test.  I have added logging to verify that everything happens in the right order wich leads me to believe that my callbacks are returning the full amount of the data at their disposal.  

I am not sure where the issue might be, my best guess based on the logging is that either multer is not fully uploading the file or fs.readFile's callback is not done correctly since ```cat uploads/stations_1402064401590.csv | wc -l``` returns 458.
