// Creates a complete graph with 10 nodes.
( function() {
        importPackage(Packages.org.cytoscape.app.CyAppAdapter);
        importPackage(Packages.org.cytoscape.model.CyNetwork);
        
        var numberOfNodes = 10;
        createCompleteGraph(numberOfNodes);
        
        function createCompleteGraph(networkSize) {
            var newNetwork = cyAppAdapter.getCyNetworkFactory().createNetwork();
            newNetwork.getRow(newNetwork).set("name", "Complete Graph with " + numberOfNodes + " Nodes");

            // Register it to the manager
            cyAppAdapter.getCyNetworkManager().addNetwork(newNetwork);

            var nodes = [];
            for (var i = 0; i < numberOfNodes; i++) {
                var nodeName = "Node " + i;
                var node = newNetwork.addNode();
                newNetwork.getRow(node).set("name", nodeName);
                nodes[i] = node;
            }

            var edgeCount = 0;
            for (var i = 0; i < numberOfNodes; i++) {
                var source = nodes[i];
                for (var j = 0; j < numberOfNodes; j++) {
                    var target = nodes[j];
                    if (newNetwork.containsEdge(source, target) == false && newNetwork.containsEdge(target, source) == false && j != i) {
                        var edge = newNetwork.addEdge(source, target, true);
                        newNetwork.getRow(edge).set("name", "Edge " + edgeCount++);
                        newNetwork.getRow(edge).set("interaction", "interacts_with");
                    }
                }
            }
        }

    }());