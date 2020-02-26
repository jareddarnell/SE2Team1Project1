using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SE2Team1Project1.Hubs
{
    public class BoardHub : Hub
    {
        //Sends a board state 17x17 of cells in a list (size that user sees is 16x16, outer layer is dead)
        public async Task SendBoard(string user, List<string> boardList)
        {
            await Clients.All.SendAsync("RecieveMessage", user, boardList);
        }
    }
}
