// load existing submission, if any
// display leaderboard
// allow player to choose from their collection
// warn if submission within the last 24 hours and do not submit (get from user profile, not from gag101scenarios)
// retrieve top 10 submissions
// run each match, pausing between w/"continue" button to keep going
// if new deck did better than any existing deck, adjust win rates
// some kind of overall tournament result message
// adjust leaderboard
// give user timestamp of submission for that scenario
// if user has existing deck in top 10, replace that deck, otherwise add it
// then, if there are 11 decks in the top 10, remove the lowest ranked one (ties broken by earliest submission)

//firebase scenario structure:
//gag101scenarios
//-scenario name
//--submissions (same as leaderboard)
//---submission (numbered)
//----timestamp
//----username
//----team
//-----member01,etc. (MAKE SAME AS CARDS IN USER PROFILES)