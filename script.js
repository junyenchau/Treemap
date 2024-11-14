let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let v 

let canvas = d3.select("#canvas")

let draw = () => {

    let tooltip = d3.select('body')
                    .append('div')
                    .attr("id", "tooltip")
                    .style("visibility", "hidden")
                    .style("width", "auto")
                    .style("height", "auto")

    let hier = d3.hierarchy(v, node => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((a,b) => {
        return b['value'] - a['value']
    })

    let tiles = hier.leaves()

    let createTree = d3.treemap()
                        .size([1000, 600]) 

    createTree(hier)

    console.log(tiles)
    
    let block = canvas.selectAll('g')
            .data(tiles)
            .enter()
            .append('g')
            .attr('transform', d => {
                return 'translate(' + d['x0'] + ', ' + d['y0'] +')'
            })

    block.append('rect')
            .attr('class', 'tile')
            .attr('fill', video => {
                if (video.data.category === "Wii") {
                    return 'greenyellow'
                } else if (video.data.category === "GB") {
                    return 'chartreuse'
                } else if (video.data.category === "PS2") {
                    return 'lawngreen'
                } else if (video.data.category === "SNES") {
                    return 'lime'
                } else if (video.data.category === "GBA") {
                    return 'limegreen'
                } else if (video.data.category === "2600") {
                    return 'palegreen'
                } else if (video.data.category === "DS") {
                    return 'lightgreen'
                } else if (video.data.category === "PS3") {
                    return 'mediumspringgreen'
                } else if (video.data.category === "3DS") {
                    return 'springgreen'
                } else if (video.data.category === "PS") {
                    return 'mediumseagreen'
                } else if (video.data.category === "XB") {
                    return 'seagreen'
                } else if (video.data.category === "PSP") {
                    return 'forestgreen'
                } else if (video.data.category === "X360") {
                    return 'green'
                } else if (video.data.category === "NES") {
                    return 'olivedrab'
                } else if (video.data.category === "PS4") {
                    return 'yellowgreen'
                } else if (video.data.category === "N64") {
                    return 'mediumaquamarine'
                } else if (video.data.category === "PC") {
                    return 'lightseagreen'
                } else {
                    return 'darkseagreen'
                } 
            })
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.data.category)
            .attr('data-value', d => d.data.value)
            .attr('width', d => d['x1'] - d['x0'])
            .attr('height', d => d['y1'] - d['y0'])
            .on('mouseover', d => {
                tooltip.transition()
                        .style('visibility', 'visible')
                        .attr('data-value', d.data.value)

                tooltip.text(`Name: ${d.data.name}, Category: ${d.data.category}, Value: ${d.data.value}`)
            })
            .on('mouseout', d => {
                tooltip.transition()
                        .style('visibility', 'hidden')
            })

    block.append('text')
            .text(d => d.data.name)
            .attr('x', 5)
            .attr('y', 20)
}

d3.json(url).then(
    (data, err) => {
        if (err) {
            console.log(err)
        } else {
            v = data
            draw()
        }
    }
)