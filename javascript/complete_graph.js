// Creates a complete graph with 20 nodes.
( function() {
        importPackage(Packages.org.cytoscape.app.CyAppAdapter);
        importPackage(Packages.org.cytoscape.model.CyNetwork);
        importPackage(java.util);
        
        var numberOfNodes = 20;
        var view = createView(createCompleteGraph(numberOfNodes));
        cyAppAdapter.getCyNetworkViewManager().addNetworkView(view);
        



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
            
            return newNetwork;
        }
        
        // Create view and apply current style and layout.
        function createView(network) {
        		var networkView = cyAppAdapter.getCyNetworkViewFactory().createNetworkView(network);
        		var tf = cyAppAdapter.get_ApplyPreferredLayoutTaskFactory();
        		var tm = cyAppAdapter.getTaskManager();
        		var vmm = cyAppAdapter.getVisualMappingManager();
        		var visualStyle = vmm.getCurrentVisualStyle();
        		vmm.setVisualStyle(visualStyle, networkView);
        		visualStyle.apply(networkView);
        		
        		var networkViewSet = new HashSet();
        		networkViewSet.add(networkView);
        		tm.execute(tf.createTaskIterator(networkViewSet));
            
            return networkView;
        }

    }());