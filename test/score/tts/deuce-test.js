/******************************************************************************
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 blackchip.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/

buster.testCase("score.tts.deuce", {

    app: null,
    
    setUp: function() {
        options = {};
        app = score.Game({gameLength: 11});
        score.features.scores(app);
        score.rules.winGameByTwo(app);
        score.tts.deuce(app);
    },
    
    "Non-Deuce score": function() {
        this.stub(app.talker, "say");
        app.scores[0] = 10;
        assert(app.talker.say.notCalled);           
    },
    
    "Deuce at tied before game length": function() {
        app.scores[0] = 10;
        this.stub(app.talker, "say");
        app.scores[1] = 10;
        assert.calledWith(app.talker.say, "Deuce");           
    },
    
    "Advantage Player 1": function() {
        app.scores[1] = 10;
        this.stub(app.talker, "say");
        app.scores[0] = 11;
        assert.calledWith(app.talker.say, "Advantage Player 1");           
    },
    
    "Advantage Player 2": function() {
        app.scores[0] = 10;
        this.stub(app.talker, "say");
        app.scores[1] = 11;
        assert.calledWith(app.talker.say, "Advantage Player 2");           
    },
    
    "Deuce": function() {
        app.scores[0] = 10;
        app.scores[1] = 10;
        app.scores[0] = 11;
        this.stub(app.talker, "say");
        app.scores[1] = 11;
        assert.calledWith(app.talker.say, "Deuce");               
    },
    
    "Silent when game is over": function() {
        app.scores[0] = 10;
        app.scores[1] = 10;
        app.scores[0] = 11;
        this.stub(app.talker, "say");
        app.scores[0] = 12;
        assert(app.talker.say.notCalled);         
    }
            
});