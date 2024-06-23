def canVisitAllRooms(rooms):
        """
        :type rooms: List[List[int]]
        :rtype: bool
        """
        numRooms = len(rooms)

        stack = [0]

        visited = set()
        while len(stack):
            roomNumber = stack.pop()
            visited.add(roomNumber)

            roomEdges = rooms[roomNumber]
            for room in roomEdges:
                  if room not in visited and room != roomNumber:
                        stack.append(room)

        print(visited)
        return len(visited) == numRooms

print(canVisitAllRooms([[1,2],[2,1],[1]]))