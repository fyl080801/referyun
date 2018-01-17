define([
    'modules/trytest/module'
], function (module) {
    'use strict';

    module.factory('modules/trytest/factories/messageHub', [
        '$rootScope', 'Hub', '$timeout',
        function ($rootScope, Hub, $timeout) {
            //declaring the hub connection 
            var callbacks = {
                receiveCallback: function (msg) {

                }
            };

            var hub = new Hub('webim', {

                //client side methods 
                listeners: {
                    'receive': function (msg) {
                        callbacks.receiveCallback(msg);
                        $rootScope.$apply();
                    }
                },

                //server side methods 
                methods: ['send'],

                //handle connection error 
                errorHandler: function (error) {
                    console.error(error);
                },

                //specify a non default root 
                rootPath: 'http://localhost:9000/signalr',

                stateChanged: function (state) {
                    switch (state.newState) {
                        case $.signalR.connectionState.connecting:
                            //your code here 
                            break;
                        case $.signalR.connectionState.connected:
                            //your code here 
                            break;
                        case $.signalR.connectionState.reconnecting:
                            //your code here 
                            break;
                        case $.signalR.connectionState.disconnected:
                            //your code here 
                            break;
                    }
                }
            });

            var send = function (msg) {
                hub.send(msg); //Calling a server method 
            };

            return {
                sendMessage: send,
                setReceive: function (fn) {
                    callbacks.receiveCallback = fn;
                }
            };
        }
    ]);
});