# Dynamic-snapshot-handler


* Services:
    * Graph: Queries to get data from snapshot graph and Dynamic nft graph. GetSpace to fetch all proposal for certain ens domain, voters to fetch list of addresses for certain proposal
    * Proposal: Calls to graph to get the proposals, voters and check if proposal has passed
    * stateHandler: service to keep track of checked proposals by id. 
    * Voter: 
        * updating voter when user has voted to proposal, if looks hit zero call contract to set subscription to expired.
        * add voter when new nft is minted, check graph for mint events and add voter to db
        * getLooks return number of looks for subscriptionNFTs, this will be used on fronted.
